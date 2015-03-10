import rauth
import time
 
def main():
    locations = [(37.7917388, -122.4011828)]
    yelp_response = []
    for lat,long in locations:
        params = get_search_parameters(lat,long)
        yelp_response.append(get_results(params))
        # Rate-limiting just in case
        time.sleep(1.0)

    ##Do other processing
    return yelp_response
 
def get_results(params):
 
    #From Yelp's manage access page


    session = rauth.OAuth1Session(
        consumer_key = consumer_key
        ,consumer_secret = consumer_secret
        ,access_token = token
        ,access_token_secret = token_secret)

    request = session.get("http://api.yelp.com/v2/search",params=params)

    #Transforms the JSON API response into a Python dictionary
    data = request.json()
    session.close()

    return data

def get_search_parameters(lat,long):
    #See the Yelp API for more details
    params = {}
    params["term"] = "starbucks"
    params["ll"] = "{},{}".format(str(lat),str(long))
    params["radius_filter"] = "1000"
    params["limit"] = "5"
 
    return params
 
if __name__=="__main__":
    main()