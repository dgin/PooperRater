# Not actually an api call
from pooperRater.models import Rating
from django.db.models import Avg


def something(place_id):
    # returns average rating for quality for the place specified in place_id
    return Rating.objects.filter(place=place_id).aggregate(Avg('quality'))
