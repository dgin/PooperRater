# Not actually an api call
from pooperRater.models import Rating
from django.db.models import Avg, Max, Sum


def something(place_id):
    # a = Rating.objects.filter(place=place_id)
    # sum = 0
    # length = len(a)
    # print a
    # for i in a:
    #     test = i.quality
    #     sum += test
    # avg = float(sum)/float(length)
    # print avg
    # print a.query
    print Rating.objects.filter(place=place_id).aggregate(Avg('quality'))
    # Book.objects.all().aggregate(Avg('price'))
    # print stars_average
