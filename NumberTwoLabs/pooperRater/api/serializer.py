
from rest_framework import serializers, permissions
from pooperRater.models import Rating, Place, Comment, Restroom
from pooperRater.permissions import IsOwnerOrReadOnly
from pooperRater.models import User, AnonUserInfo

class RatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rating
        fields = ('user', 'place', 'air_flow', 'cleanliness', 'available', 'quality', 'other',
                  'created_at', 'updated_at')

class PlaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = ('name', 'floor', 'unit', 'address', 'desc',
                  'place_type', 'start_hours', 'end_hours', 'pic',
                  'yelp_id', 'yelp_categories', 'google_id',
                  'google_lat', 'google_long', 'created_at', 'updated_at')

class CommentSerializer (serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('rating', 'body', 'upvote', 'downvote',
                  'created_at', 'updated_at')

class RestroomSerializer (serializers.ModelSerializer):

    class Meta:
        model = Restroom
        fields = ('place', 'floor', 'local_identifier', 'type', 'feature',
                  'created_at', 'updated_at')


class UserSerializer(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(many=True, queryset=Todo.objects.all())
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly,)
    class Meta:
        model = User
        fields = ['id', 'username',]

class AnonUserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnonUserInfo
