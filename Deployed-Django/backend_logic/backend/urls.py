from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from testapp import views
from ortools.sat.python import cp_model

router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('testapi/', include('testapp.urls'))
]