from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from team.views import TeamViewSet

router = DefaultRouter()
router.register('teams', TeamViewSet, basename="teams")

urlpatterns = [
    path('', include(router.urls))
]