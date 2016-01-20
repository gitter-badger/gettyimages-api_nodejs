var querystring = require('querystring')
var WebHelper = require('./webhelper.js')

module.exports = Credentials

function Credentials(apiKey, apiSecret, username, password, refreshToken, hostName) {

	var _accessToken = null
	var _apiKey = apiKey
	var _apiSecret = apiSecret
	var _username = username
	var _password = password
	var _refreshToken = refreshToken

	this.refreshAccessToken = function(next) {
		var params = {
			client_id: apiKey,
			client_secret: apiSecret,
			refresh_token: refreshToken,
			grant_type: "refresh_token"
		};
		
		var postData = querystring.stringify(params);
		var path = '/oauth2/token';

		var webHelper = new WebHelper(this, hostName);
		webHelper.postForm(postData, path, function(err, response) {
			if (err) {
				return next(err, null);
			} else {
				var expireTime = new Date();
				expireTime.setSeconds(expireTime.getSeconds() + Number(response.expires_in));
				_accessToken = response;
				_accessToken.expiration = expireTime;
				return next(null, _accessToken);
			}
		})
	}
	
	this.getAccessToken = function(next) {

		if (!shouldRefreshToken()) {
			return next(null, _accessToken)
		}

		var params = {
			client_id: apiKey,
			client_secret: apiSecret,
			grant_type: 'client_credentials'
		}

		if (username && password) {
			params.username = username
			params.password = password
			params.grant_type = 'password'
		}

		var postData = querystring.stringify(params)
		var path = '/oauth2/token'

		var webHelper = new WebHelper(this, hostName)
		webHelper.postForm(postData, path, function(err, response) {
			if (err) {
				return next(err, null)
			} else {
				var expireTime = new Date()
				expireTime.setSeconds(expireTime.getSeconds() + Number(response.expires_in))
				_accessToken = response
				_accessToken.expiration = expireTime
				return next(null, _accessToken)
			}
		})
	}

	this.getApiKey = function() {
		return _apiKey
	}

	this.getApiSecret = function() {
		return _apiSecret
	}

	this.getPassword = function() {
		return _password
	}

	this.getUsername = function() {
		return _username
	}
	
	this.getRefreshToken = function() {
		return _refreshToken;
	}

	function shouldRefreshToken() {
		if (_accessToken && _accessToken.expiration) {
			return new Date(Date.now() - 5000) > _accessToken.expiration
		} else {
			return true
		}
	}
}
