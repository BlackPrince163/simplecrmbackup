from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from clients.views import ClientViewSet, NoteViewSet

router = DefaultRouter()
router.register('clients', ClientViewSet, basename="clients")
router.register('notes', NoteViewSet, basename="notes")

urlpatterns = [
    path('', include(router.urls))
]