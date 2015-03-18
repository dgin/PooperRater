from django.contrib.auth.models import User
from requests import Response
from rest_framework import viewsets, generics
from pooperRater.models import Rating, Place, Comment, Restroom, User, AnonUserInfo, Vote
from pooperRater.api.serializer import RatingSerializer, PlaceSerializer, CommentSerializer, RestroomSerializer, UserSerializer, AnonUserInfoSerializer, VoteSerializer
from pooperRater.permissions import IsOwnerOrReadOnly, IsAdminUserOrReadOnly, AnonInfoIsRelatedUserOrReadOnly, UserIsOwnerOrReadOnly, CommentIsOwnerOrReadOnly
from rest_framework import permissions


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)


class PlaceRatingViewSet(generics.ListAPIView):
    serializer_class = RatingSerializer

    def get_queryset(self, *args, **kwargs):
        return Rating.objects.filter(place__id=self.kwargs.get('pk'))


class RatingCommentViewSet(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self, *args, **kwargs):
        return Comment.objects.filter(rating__id=self.kwargs.get('pk'))


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = ()
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsAdminUserOrReadOnly,)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, CommentIsOwnerOrReadOnly,)


class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, CommentIsOwnerOrReadOnly,)


class RestroomViewSet(viewsets.ModelViewSet):
    queryset = Restroom.objects.all()
    serializer_class = RestroomSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, UserIsOwnerOrReadOnly,)

class AnonUserInfoVIewSet(viewsets.ModelViewSet):
    queryset = AnonUserInfo.objects.all()
    serializer_class = AnonUserInfoSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, AnonInfoIsRelatedUserOrReadOnly,)

