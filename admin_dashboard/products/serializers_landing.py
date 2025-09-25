from rest_framework import serializers
from .models_landing import LandingPage

class LandingPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LandingPage
        fields = '__all__'
