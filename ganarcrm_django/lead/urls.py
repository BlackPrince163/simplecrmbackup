from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from lead.views import LeadViewSet, delete_lead

router = DefaultRouter()
router.register('leads', LeadViewSet, basename="leads")

urlpatterns = [
    path("leads/delete_lead/<int:lead_id>/", delete_lead, name='delete_lead'),
    path('', include(router.urls))
]