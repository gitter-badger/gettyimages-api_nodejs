var Credentials = require('./lib/credentials.js')
var Download = require('./lib/download.js')
var Images = require('./lib/images.js')
var SdkException = require('./lib/sdkexception.js')
var Search = require('./lib/search.js')
var Collections = require("./lib/collections");

module.exports = ConnectSdk

function ConnectSdk(apiKey, apiSecret, username, password, refreshToken, hostName) {

	if (!apiKey) {
		throw new SdkException('must specify an apiKey')
	}
	
	if (!apiSecret) {
		throw new SdkException('must specify an apiSecret')
	}
	
	if (!hostName) {
		hostName = 'api.gettyimages.com'
	}
	
	var credentials = new Credentials(apiKey, apiSecret, username, password, refreshToken, hostName)
	
	this.download = function() {
		return new Download(credentials, hostName)
	}

	this.getAccessToken = function(next) {
		if (credentials.getRefreshToken()) {
			credentials.refreshAccessToken(function(err, accessToken) {
				if (err) {
					next(err, null)
				} else {
					next(null, accessToken)
				}
			});
		} else {
			credentials.getAccessToken(function(err, accessToken) {
				if (err) {
					next(err, null)
				} else {
					next(null, accessToken)
				}
			});
		}
	}

	this.images = function() {
		return new Images(credentials, hostName);
	}

	this.search = function() {
		return new Search(credentials, hostName);
	}
	
	this.collections = function() {
		return new Collections(credentials, hostName);
	}
}