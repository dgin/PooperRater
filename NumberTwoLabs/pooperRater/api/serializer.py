from rest_framework import serializers, permissions
from pooperRater.models import Rating, Place, Comment, Restroom, Vote
from pooperRater.permissions import IsOwnerOrReadOnly
from pooperRater.models import User, AnonUserInfo

class RatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rating
        fields = ('owner', 'place', 'air_flow', 'cleanliness', 'available', 'quality', 'other',
                  'created_at', 'updated_at')

class PlaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = ('id', 'name', 'floor', 'unit', 'address', 'city', 'desc',
                  'place_type', 'start_hours', 'end_hours', 'pic',
                  'yelp_id', 'yelp_categories', 'google_id',
                  'google_lat', 'google_long', 'created_at', 'updated_at',
                  'average_rating', 'overall_average_rating')

class CommentSerializer (serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('rating', 'body',
                  'created_at', 'updated_at')


class VoteSerializer (serializers.ModelSerializer):

    class Meta:
        model = Vote
        fields = ('comment', 'upvote', 'downvote',
                  'created_at', 'updated_at')


class RestroomSerializer (serializers.ModelSerializer):

    class Meta:
        model = Restroom
        fields = ('place', 'floor', 'local_identifier', 'type', 'feature',
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
        fields = ('id', 'anonymous_name', 'user_img', 'related_user')
