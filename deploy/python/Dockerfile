FROM python:3.8

ENV PYTHONUNBUFFERED 1

RUN pip install poetry==1.1.8 && poetry config virtualenvs.create false

WORKDIR /app
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt


COPY . .

RUN python ganarcrm_django/manage.py collectstatic --no-input

EXPOSE 8000

CMD python ganarcrm_django/manage.py migrate && \
    gunicorn --chdir ganarcrm_django --bind 0.0.0.0:8000 testdjango.wsgi
