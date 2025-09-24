from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .models_landing import LandingPage
from .serializers_landing import LandingPageSerializer

class LandingPageViewSet(viewsets.ModelViewSet):
    queryset = LandingPage.objects.all().order_by('-updated_at')
    serializer_class = LandingPageSerializer
    permission_classes = [IsAdminUser]
