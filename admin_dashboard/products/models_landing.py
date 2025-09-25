
from django.db import models


# Unified JSON landing page model
class LandingPage(models.Model):
    data = models.JSONField(default=dict, blank=True)  # Store the entire landing page as JSON
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.data.get('title', 'LandingPage')

## Remove category/section models (all data in JSON)
