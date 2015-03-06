from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django.db.models import Avg


class Place(models.Model):
    # Place data - general
    name = models.CharField(max_length=80)
    floor = models.IntegerField(null=True)

    unit = models.CharField(null=True, blank=True, max_length=5)
    address = models.CharField(null=True, blank=True, max_length=120)
    desc = models.TextField(null=True, blank=True)
    place_type = models.SmallIntegerField(null=True)
    start_hours = models.TimeField(null=True)
    end_hours = models.TimeField(null=True)
    pic = models.ImageField(null=True, blank=True)

    # Place data specific to yelp
    yelp_id = models.CharField(max_length=100, null=True, blank=True)
    yelp_categories = models.TextField(blank=True)

    # Place data specific to google
    google_id = models.CharField(max_length=100, null=True, blank=True)
    google_lat = models.SmallIntegerField(null=True, blank=True)
    google_long = models.SmallIntegerField(null=True, blank=True)

    type_conversion = {
        1: "placeholder",
        2: "bad food",
        3: "new string"
    }

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return u"{}".format(self.name) + " Types: {}.".format(self.type_conversion[self.place_type])

    @property
    def average_rating(self):
        return [Rating.objects.filter(place__id=self.id).aggregate(Avg('air_flow')),
                Rating.objects.filter(place__id=self.id).aggregate(Avg('cleanliness')),
                Rating.objects.filter(place__id=self.id).aggregate(Avg('available')),
                Rating.objects.filter(place__id=self.id).aggregate(Avg('quality')),
                Rating.objects.filter(place__id=self.id).aggregate(Avg('other'))
                ]

    @property
    def overall_average_rating(self):
        overall_average = 0
        average_rating_list = self.average_rating
        for average in average_rating_list:
            overall_average += average.values()[0]
        return overall_average / len(average_rating_list)



class AnonUserInfo(models.Model):
    related_user = models.ForeignKey(User)
    anonymous_name = models.CharField(max_length=80, default='Anonymous')
    user_img = models.ImageField(null=True, blank=True)

    # REQUIRED_FIELDS = ['username', 'anon_name']

    def __unicode__(self):
        return u"{}".format(self.anonymous_name)


class Rating(models.Model):
    # links
    user = models.ForeignKey(User)
    place = models.ForeignKey(Place)

    # Stars
    STAR_CONVERSION = (
        (1, 'One'),
        (2, 'Two'),
        (3, 'Three'),
        (4, 'Four'),
        (5, 'Five'),
    )
    air_flow = models.PositiveSmallIntegerField(choices=STAR_CONVERSION)
    cleanliness = models.PositiveSmallIntegerField(choices=STAR_CONVERSION)
    available = models.PositiveSmallIntegerField(choices=STAR_CONVERSION)
    quality = models.PositiveSmallIntegerField(choices=STAR_CONVERSION)
    other = models.PositiveSmallIntegerField(choices=STAR_CONVERSION)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # def __unicode__(self):
    #     return u"{}, {}".format(self.user, self.place)


class Comment(models.Model):
    rating = models.OneToOneField(Rating)
    body = models.TextField(null=True, blank=True)
    upvote = models.SmallIntegerField(null=True, blank=True)
    downvote = models.SmallIntegerField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return u"{}".format(self.rating.user.username)


class Restroom(models.Model):
    # Identifying information
    place = models.ForeignKey(Place)
    floor = models.CharField(max_length=3, null=True, blank=True)
    local_identifier = models.SmallIntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    type = models.SmallIntegerField(max_length=1)
    features = models.TextField(null=True, blank=True)

    type_conversion = {
        1: "test",
        2: "other"
    }



