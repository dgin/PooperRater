import json
import rauth
import time
 
def main(term, locations):
    locations = locations # Either a tuple with Lat,Lng or a string with address
    # If user doesn't specify location, then using current location, stored as tuple
    if type(locations) == type((1,)):
        lat = locations[0]
        long = locations[1]
        params = get_search_parameters(lat,long, term)
    # If user specifies location, then pass that in as parameter
    else:
        params=get_search_parameters_alt(locations, term)

    return get_results(params)
 
def get_results(params):

    # API Keys here
    consumer_key = "LM8exyo5oOnZyV5MyyNIGA"
    consumer_secret = "7IAhPNR2oqW9acrZfA-KtYdn0Wo"
    token = "DQw_8H-jNPU86EchgVBvwl1JkOLbBSg1"
    token_secret = "ESk44SB54vuxJZHXe_YuN2SdEPM"

    session = rauth.OAuth1Session(
        consumer_key = consumer_key
        ,consumer_secret = consumer_secret
        ,access_token = token
        ,access_token_secret = token_secret)

    request = session.get("http://api.yelp.com/v2/search",params=params)

    #Transforms the JSON API response into a Python dictionary
    # Use for testing, but disable for development version
    data = request.json()
    session.close()
    return data
    # return json.dumps(request.json())

def get_search_parameters(lat,long, term):
    #See the Yelp API for more details
    params = {}
    params["term"] = term
    params["ll"] = "{},{}".format(str(lat),str(long))
    params["radius_filter"] = "1000"
    params["limit"] = "5"
 
    return params

# Alternative, if user passes search parameters
def get_search_parameters_alt(location, term):
    #See the Yelp API for more details
    params = {}
    params["term"] = term
    params["location"] = location
    params["radius_filter"] = "1000"
    params["limit"] = "5"

    return params
 
# if __name__=="__main__":
#     main()