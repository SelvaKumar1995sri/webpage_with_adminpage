from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Product

@login_required
def admin_dashboard(request):
	products = Product.objects.all()
	total_products = products.count()
	total_revenue = sum([(p.price - (p.price * (p.discount or 0) / 100)) * p.stock for p in products])
	recent_orders = 0  # Placeholder, implement order logic if needed
	context = {
		'products': products,
		'total_products': total_products,
		'total_revenue': total_revenue,
		'recent_orders': recent_orders,
	}
	return render(request, 'admin_dashboard.html', context)
