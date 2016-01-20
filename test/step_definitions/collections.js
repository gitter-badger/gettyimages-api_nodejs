var ApiClient = require("../../connectsdk");
var nock = require("nock");



module.exports = function () {
  this.When(/^I retrieve collections$/, function (callback) {
    nock("https://api.gettyimages.com")
    .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=client_credentials")
    .reply(200, {
      access_token: "client_credentials_access_token",
      token_type: "Bearer",
      expires_in: "1800",
    })
    .get("/v3/collections")
    .matchHeader("Authorization", "Bearer client_credentials_access_token")
    .reply(401, {
      Message: "Your access token does not authorize access to this resource."
    })
    .get("/v3/collections")
    .matchHeader("Authorization", "Bearer resource_owner_access_token")
    .reply(200, {
    collections: [
      {
        asset_family: "editorial",
        code: "ENT",
        id: 58,
        license_model: "rightsmanaged",
        name: "Getty Images Entertainment",
        product_types: [
          "easyaccess"
        ]
      },
      {
        asset_family: "editorial",
        code: "SPO",
        id: 57,
        license_model: "rightsmanaged",
        name: "Getty Images Sport",
        product_types: [
          "easyaccess",
          "premiumaccess"
        ]
      }]});
    var client = new ApiClient(this.apikey, this.apisecret, this.username, this.password)
    client.collections().execute(function (err, response) {
      if (err) {
        callback(err);
      } else {
        this.response = response;
        callback();
      }
    });
  });

  this.Then(/^I recieve an error stating "([^"]*)"$/, function (arg1, callback) {
    callback();
  });

  this.Then(/^I receive collection details$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback();
  });
}