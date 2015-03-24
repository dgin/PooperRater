from rest_framework import serializers
from pooperRater.models import Rating, Place, Vote, AnonUserInfo
from django.contrib.auth.models import User

class RatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rating
        fields = ('id', 'owner', 'place', 'air_flow', 'cleanliness', 'available', 'quality', 'other',
                  'rating_comment','number_of_upvotes','number_of_downvotes', 'users_rated_ratings',
                  'created_at', 'updated_at')

class PlaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = ('id', 'name', 'address', 'city', 'desc',
                  'latitude', 'longitude', 'yelp_id', 'yelp_categories', 'yelp_url', 'google_id',
                  'created_at', 'updated_at', 'average_rating', 'overall_average_rating', 'number_of_ratings')


class VoteSerializer (serializers.ModelSerializer):

    class Meta:
        model = Vote
        fields = ('id', 'vote_owner', 'rating_vote', 'upvote', 'downvote',
                  'created_at', 'updated_at')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']


class AnonUserInfoSerializer(serializers.ModelSerializer):
    related_user = serializers.SlugRelatedField(
        read_only=True,
        slug_field = 'id'
    )

    class Meta:
        model = AnonUserInfo
        fields = ('id', 'anonymous_name', 'related_user')
