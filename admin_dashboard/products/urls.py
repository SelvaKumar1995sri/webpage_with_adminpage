from django.urls import path, include
from .views import admin_dashboard
from rest_framework.routers import DefaultRouter
from .serializers import ProductViewSet
from .views_landing import LandingPageViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'landing', LandingPageViewSet, basename='landing')

urlpatterns = [
    path('dashboard/', admin_dashboard, name='admin_dashboard'),
    path('api/', include(router.urls)),
]
