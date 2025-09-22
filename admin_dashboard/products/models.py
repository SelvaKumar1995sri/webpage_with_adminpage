from django.db import models


class Product(models.Model):
	name = models.CharField(max_length=255)
	price = models.DecimalField(max_digits=10, decimal_places=2)
	description = models.TextField(blank=True)
	stock = models.PositiveIntegerField()
	category = models.CharField(max_length=100)
	image = models.ImageField(upload_to='product_images/', blank=True, null=True)
	discount = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, help_text='Discount percentage (e.g., 10.00 for 10%)')
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.name
