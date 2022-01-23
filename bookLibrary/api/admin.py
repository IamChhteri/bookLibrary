from django.contrib import admin
from .models import Book


# Register your models here.
@admin.register(Book)
class BooksRecord(admin.ModelAdmin):
    list_display = ['id', 'name', 'author', 'price']
