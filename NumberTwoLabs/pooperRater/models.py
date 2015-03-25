from django.contrib.auth.models import User
from django.db import models
from django.db.models import Avg


class Place(models.Model):
    # PlaceListItem data - general
    name = models.CharField(max_length=80)
    address = models.CharField(null=True, blank=True, max_length=120)
    city = models.CharField(null=True, blank=True, max_length=120)
    desc = models.TextField(null=True, blank=True, max_length=200)

    # Location data
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    # PlaceListItem data specific to yelp
    yelp_id = models.CharField(max_length=100, null=True, blank=True, unique=True)
    yelp_url = models.URLField(null=True, blank=True)
    yelp_categories = models.TextField(blank=True)


    # PlaceListItem data specific to google
    google_id = models.CharField(max_length=100, null=True, blank=True)

    type_conversion = {
        1: "placeholder",
        2: "bad food",
        3: "new string"
    }

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def number_of_ratings(self):
        return Rating.objects.filter(place__id=self.id).count()

    @property
    def average_rating(self):
        empty_list = {}

        if Rating.objects.filter(place__id=self.id).aggregate(Avg('air_flow')) > 0:
            empty_list.update(Rating.objects.filter(place__id=self.id).aggregate(Avg('air_flow')))

        if Rating.objects.filter(place__id=self.id).aggregate(Avg('cleanliness')) > 0:
            empty_list.update(Rating.objects.filter(place__id=self.id).aggregate(Avg('cleanliness')))

        if Rating.objects.filter(place__id=self.id).aggregate(Avg('available')) > 0:
            empty_list.update(Rating.objects.filter(place__id=self.id).aggregate(Avg('available')))

        if Rating.objects.filter(place__id=self.id).aggregate(Avg('quality')) > 0:
            empty_list.update(Rating.objects.filter(place__id=self.id).aggregate(Avg('quality')))

        if Rating.objects.filter(place__id=self.id).aggregate(Avg('other')) > 0:
            empty_list.update(Rating.objects.filter(place__id=self.id).aggregate(Avg('other')))

        return empty_list


    @property
    def overall_average_rating(self):
        overall_average = 0

        for average in self.average_rating:
            if self.average_rating[average] != None:
                overall_average += self.average_rating[average]
        return overall_average / len(self.average_rating)

    def __unicode__(self):
        return u"{}".format(self.name)


class AnonUserInfo(models.Model):
    related_user = models.OneToOneField(User, related_name='anon_user')
    anonymous_name = models.CharField(max_length=80, default='Anonymous', unique=True)
    user_img = models.ImageField(null=True, blank=True)

    def __unicode__(self):
        return u"{}".format(self.anonymous_name)


class Rating(models.Model):
    # links
    owner = models.ForeignKey(User)
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

    rating_comment = models.TextField(null=True, blank=True, max_length=1000)

    # user_rated = models.CommaSeparatedIntegerField(max_length=500, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, **kwargs):
        super(Rating, self).save(**kwargs)
        vote = Vote(rating_vote=self)
        vote.save()

    # @property
    # def users_rated_ratings(self):
    #     user_rated = []
    #     owners = Vote.objects.filter(rating_vote__id = self.id).values('vote_owner')
    #     for item in owners:
    #         user_rated.append(item['vote_owner'])
    #     return user_rated

    @property
    def number_of_upvotes(self):
        return Vote.objects.filter(rating_vote__id=self.id).filter(upvote=True).count()

    @property
    def number_of_downvotes(self):
        return Vote.objects.filter(rating_vote__id=self.id).filter(downvote=True).count()

    def __unicode__(self):
        return u"{}, {}".format(self.place, self.owner)


class Vote(models.Model):
    # vote_owner = models.ForeignKey(User)
    rating_vote = models.ForeignKey(Rating)
    upvote = models.BooleanField(default=False)
    downvote = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return u"{}".format(self.rating_vote)


