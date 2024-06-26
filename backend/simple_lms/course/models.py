from django.conf import settings
from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField()
    short_description = models.TextField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Categories"


class Course(models.Model):
    DRAFT = 'draft'
    IN_REVIEW = 'in_review'
    PUBLISHED = 'published'

    STATUS_CHOICES = (
        (DRAFT, 'Draft'),
        (IN_REVIEW, 'In review'),
        (PUBLISHED, 'Published')
    )

    categories = models.ManyToManyField(Category)
    title = models.CharField(max_length=255)
    slug = models.SlugField()
    short_description = models.TextField(blank=True, null=True)
    long_description = models.TextField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)
    created_by = models.ForeignKey(User, related_name='courses', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='uploads', blank=True, null=True)
    status = models.CharField(max_length=25, choices=STATUS_CHOICES, default=DRAFT)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.title

    def get_image(self):
        if self.image:
            return settings.WEBSITE_URL + self.image.url
        else:
            return 'https://bulma.io/assets/images/placeholders/1280x960.png'


class Lessons(models.Model):
    DRAFT = 'draft'
    PUBLISHED = 'published'

    CHOICES_STATUS = (
        (DRAFT, 'Draft'),
        (PUBLISHED, 'Published'),
    )

    ARTICLE = 'article'
    QUIZ = 'quiz'
    VIDEO = 'video'

    CHOICES_LESSON_TYPE = (
        (ARTICLE, 'Article'),
        (QUIZ, 'Quiz'),
        (VIDEO, 'Video'),
    )

    course = models.ForeignKey(Course, related_name='lessons', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    slug = models.SlugField()
    short_description = models.TextField(blank=True, null=True)
    long_description = models.TextField(blank=True, null=True)
    status = models.CharField(choices=CHOICES_STATUS, default=PUBLISHED, max_length=20)
    lesson_type = models.CharField(choices=CHOICES_LESSON_TYPE, default=ARTICLE, max_length=20)
    youtube_id = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    course = models.ForeignKey(Course, related_name='comments', on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lessons, related_name='comments', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)


class Quiz(models.Model):
    lesson = models.ForeignKey(Lessons, related_name='quizzes', on_delete=models.CASCADE)
    question = models.CharField(max_length=200, null=True)
    answer = models.CharField(max_length=200, null=True)
    op1 = models.CharField(max_length=200, null=True)
    op2 = models.CharField(max_length=200, null=True)
    op3 = models.CharField(max_length=200, null=True)

    class Meta:
        verbose_name_plural = 'Quizzes'
