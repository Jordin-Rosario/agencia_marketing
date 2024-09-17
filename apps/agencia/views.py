from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView, get_object_or_404
from .models import Producto
from .serializers import ProductoSerializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework import status
from core.utilis import SmallResultsSetPagination, LargeResultsSetPagination



class ProductosListAPIView(ListCreateAPIView):
    queryset = Producto.objects.all().order_by('id')
    serializer_class = ProductoSerializers
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]
    filter_backends = [SearchFilter]
    search_fields = ['nombre', 'descripcion']
    pagination_class = SmallResultsSetPagination


    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
class ProductosRetrieveAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializers
    permission_classes = [AllowAny]
    # authentication_classes = [TokenAuthentication]

    def get(self, request, *args, **kwars):
        return self.retrieve(request, *args, **kwars)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "deleted restaurant successfully"}, status=status.HTTP_200_OK)
    
    def perform_destroy(self, instance):
        instance.delete()
