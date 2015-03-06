from rest_framework import viewsets
from pooperRater.models import Rating, Place, Comment, Restroom, User, AnonUserInfo
from pooperRater.api.serializer import RatingSerializer, PlaceSerializer, CommentSerializer, RestroomSerializer, UserSerializer, AnonUserInfoSerializer
from pooperRater.permissions import IsOwnerOrReadOnly
from rest_framework import permissions



class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class RestroomViewSet(viewsets.ModelViewSet):
    queryset = Restroom.objects.all()
    serializer_class = RestroomSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly,)

class AnonUserInfoVIewSet(viewsets.ModelViewSet):
    queryset = AnonUserInfo.objects.all()
    serializer_class = AnonUserInfoSerializer

