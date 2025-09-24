
from django.db import models

class LandingPage(models.Model):
    title = models.CharField(max_length=200)
    nav_links = models.JSONField(default=list, blank=True)  # e.g. ["Shop", "About", ...]
    cart_icon = models.CharField(max_length=100, blank=True)
    profile_icon = models.CharField(max_length=100, blank=True)
    footer_content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class LandingCategory(models.Model):
    landing = models.ForeignKey(LandingPage, related_name='categories', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    image = models.URLField()
    bg_color = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.name

class LandingSection(models.Model):
    landing = models.ForeignKey(LandingPage, related_name='sections', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.JSONField(default=dict, blank=True)  # Flexible for trending, accessories, etc.

    def __str__(self):
        return self.title
