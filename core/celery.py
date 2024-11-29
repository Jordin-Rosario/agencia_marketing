# my_project/celery.py

from __future__ import absolute_import
import os
from celery import Celery

# Establecer el módulo de configuración de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

app = Celery('core')

# Cargar las configuraciones de Celery desde settings.py
app.config_from_object('django.conf:settings', namespace='CELERY')

# Descubrir las tareas automáticamente en todas las apps
app.autodiscover_tasks()