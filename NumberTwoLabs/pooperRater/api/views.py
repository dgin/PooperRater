from rest_framework import viewsets
from rest_framework.generics import ListAPIView, RetrieveAPIView
from pooperRater.models import Rating, Place, Comment, Restroom, User, AnonUserInfo
from pooperRater.api.serializer import RatingSerializer, PlaceSerializer, CommentSerializer, RestroomSerializer, UserSerializer


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    # lookup_field = 'id'


    # air_flow_average = Rating.objects.filter(place='id').aggregate(Avg('air_flow'))
    # cleanliness_average = Rating.objects.filter(place='id').aggregate(Avg('cleanliness'))
    # available_average = Rating.objects.filter(place='id').aggregate(Avg('available'))
    # quality_average = Rating.objects.filter(place='id').aggregate(Avg('air_flow'))
    # other_average = Rating.objects.filter(place='id').aggregate(Avg('air_flow'))
    #
    # overall_average = Rating.objects.filter(place='place_id').aggregate(Avg(air_flow_average + cleanliness_average + available_average + quality_average + other_average))


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class RestroomViewSet(viewsets.ModelViewSet):
    queryset = Restroom.objects.all()
    serializer_class = RestroomSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# class UserDetail(viewsets.ModelViewSet):
#     queryset = AnonUserInfo.objects.all()
#     serializer_class = UserSerializer