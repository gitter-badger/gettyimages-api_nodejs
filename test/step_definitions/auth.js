var ApiClient = require('../../connectsdk.js');

module.exports = function() {
    // this.World = require('../support/world');
    this.Given(/^I have an apikey$/, function(callback){
        this.apikey = process.env.GettyImagesApi_ApiKey;
        callback();
    });
    
    this.Given(/^an apisecret$/, function(callback){
        this.apisecret = process.env.GettyImagesApi_ApiSecret;
        callback();
    });
    
     this.Given(/^a username$/, function (callback) {
        this.username = process.env.GettyImagesApi_UserName;
        callback();
    });

    this.Given(/^a password$/, function (callback) {
        this.password = process.env.GettyImagesApi_UserPassword;
        callback();
    });
    
    this.When(/^I ask the sdk for an authentication token$/, function(callback){
        var context = this;
        var client = new ApiClient(this.apikey, this.apisecret, this.username, this.password);
        client.getAccessToken(function(err, response) {
				if (err) {
                     callback(err);
                }
                context.accessToken = response.access_token;
                context.tokenType = response.token_type;
                context.refreshToken = response.refresh_token;
                context.expiresIn = response.expires_in;
                callback();
        });
    });
    
    this.Then(/^a(n)? (access )?token is returned$/, function(a, b, callback){
        if (this.accessToken.length > 0) {
            callback();
        } else {
            callback(new Error("Expected an access token to be returned."));
        }
    });

    this.Given(/^a refresh token$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I request an access token$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });
};