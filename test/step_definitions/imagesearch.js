var ApiClient = require("../../connectsdk");
var nock = require("nock");

module.exports = function () {

	this.When(/^I configure my search for (.*) images$/, function (imageFamily, callback) {
		
		
	var client = new ApiClient(this.apikey, this.apisecret, this.username, this.password).search().images();
	if (imageFamily === "creative") {
		this.search = client.creative();
	} else if (imageFamily == "editorial") {
		this.search = client.editorial();
	}
	callback();
	});


	this.Given(/^I search for dog$/, function (callback) {
		nock("https://api.gettyimages.com")
    .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&username=username&password=password&grant_type=password")
    .reply(200, {
      access_token: "resource_owner_access_token",
      token_type: "Bearer",
      expires_in: "1800",
    })
    .get("/v3/search/images/creative")
	.query({ phrase: "dog" })
    // .matchHeader("Authorization", "Bearer resource_owner_access_token")
    .reply(200, {
  result_count: 144209,
  images: [
    {
      id: "583596559",
      asset_family: "creative",
      caption: "Studio portrait of two huskies smiling",
      collection_code: "TSIR",
      collection_id: 41,
      collection_name: "Stone",
      display_sizes: [
        {
          is_watermarked: false,
          name: "thumb",
          uri: "http://cache4.asset-cache.net/xt/583596559.jpg?v=1&g=fs1|0|TSIR|96|559&s=1&b=OTkz"
        }
      ],
      license_model: "rightsmanaged",
      max_dimensions: {
        height: 5616,
        width: 3744
      },
      title: "Two Happy Husky Dogs"
    }]})
	.get("/v3/search/images/editorial")
	.query({ phrase: "dog" })
    // .matchHeader("Authorization", "Bearer resource_owner_access_token")
    .reply(200, {
  result_count: 144209,
  images: [
    {
      id: "583596559",
      asset_family: "editorial",
      caption: "Studio portrait of two huskies smiling",
      collection_code: "TSIR",
      collection_id: 41,
      collection_name: "Stone",
      display_sizes: [
        {
          is_watermarked: false,
          name: "thumb",
          uri: "http://cache4.asset-cache.net/xt/583596559.jpg?v=1&g=fs1|0|TSIR|96|559&s=1&b=OTkz"
        }
      ],
      license_model: "rightsmanaged",
      max_dimensions: {
        height: 5616,
        width: 3744
      },
      title: "Two Happy Husky Dogs"
    }]});
	
		var context = this;
		context.search.withPhrase("dog").execute(function(err, response){
			if (err) {
				callback(err);
			} else {
				context.searchResponse = response;
				callback();		
			}
		});
	});

	this.Then(/^I get a response back that has my images$/, function (callback) {
		this.searchResponse.images.length > 0;
		callback();
	});

	this.Given(/^I specify that I only want to return (.*) with my search results$/, function (fields, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^only required return fields plus (.*) are returned$/, function (fields, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I specify (.*) editorial segment$/, function (segment, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I search for All Vocabulary$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I specify a graphical (.*)$/, function (style, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I search for all vocabulary$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.When(/^I specify I want only embeddable images$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.When(/^I specify I want to exclude images containing nudity$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I specify a license model (.*)$/, function (model, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I specify an orientation (.*)$/, function (value, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I specify a (.*) age of people$/, function (value, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I search for people$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I specify an artist$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I specify a collection code$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I specify a (.*) collection filter type$/, function (filterValue, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I specify a (.*) collection code$/, function (codeValue, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I specify a (.*) composition$/, function (value, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I specify an start date$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I search$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I specify an (.*) ethnicity$/, function (value, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.When(/^I configure my search for blended images$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I specify a (.*) file type$/, function (value, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I specify a keyword id$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I specify a location of (.*)$/, function (value, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I specify a (.*) number of people in image$/, function (value, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^I specify a (.*) product type$/, function (productType, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

}