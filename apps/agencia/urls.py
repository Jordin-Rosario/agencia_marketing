from django.urls import path
from .views import ProductosListAPIView, ProductosRetrieveAPIView


urlpatterns = [
    path('servicios/', ProductosListAPIView.as_view()),
    path('servicios/<int:pk>/', ProductosRetrieveAPIView.as_view()),

]
