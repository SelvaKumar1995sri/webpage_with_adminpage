from rest_framework import serializers
from .models_landing import LandingPage, LandingCategory, LandingSection

class LandingCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = LandingCategory
        fields = '__all__'

class LandingSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LandingSection
        fields = '__all__'

class LandingPageSerializer(serializers.ModelSerializer):
    categories = LandingCategorySerializer(many=True, read_only=True)
    sections = LandingSectionSerializer(many=True, read_only=True)
    class Meta:
        model = LandingPage
        fields = '__all__'
