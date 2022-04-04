from crypt import methods
from flask import Flask,render_template, request, redirect, url_for
from flask import json
import mysql.connector
import re
 

app = Flask(__name__)
 

mydb = mysql.connector.connect(
  host="localhost",
  user="adeel",
  password="",
  database="recipeApp"
)

print(mydb)

mycursor = mydb.cursor()
mycursor.execute("SELECT * FROM test")
myresult = mycursor.fetchall()
for x in myresult:
  print(x)


@app.route('/dashbhoard/<name>')
def dashboard(name):
    return 'welcome %s' % name


@app.route('/login', methods = ['POST'])
def login():
    if 'username' in request.json and 'password' in request.json:
        username = request.json['username']
        password = request.json['password']

        mycursor.execute("SELECT * FROM user WHERE username = %s AND password = %s", (username,password))
        account = mycursor.fetchone()

        if account:
            data = {"success": True}
        else:
            data = {"success": False}
            
        response = app.response_class(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
        )
        return response



@app.route('/signup',methods = ['POST'])
def signup():
    if 'username' in request.json and 'password' in request.json:
        username = request.json['username']
        password = request.json['password']

        mycursor.execute("SELECT * FROM user where username = %s", (username,))
        account = mycursor.fetchone()

        if account:
            msg = "account already exists"
            data = {"success": False}
        elif not re.match(r'[A-Za-z]+', username):
            msg = "Username must be characters only"
        elif not username or not password:
            msg = "Please fill out form"
        else:
            #query = "INSERT INTO user (username, password) VALUES (%s)"
            #value = (username, password)
            #mycursor.execute(query, (value,))
            query = "INSERT INTO user (username, password) VALUES (%s, %s)", ((username, password),)
            mycursor.executemany(*query)
            msg = "Successfully created account"
            mydb.commit()
            data = {"success": True}
            
            

        response = app.response_class(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
        )
        return response

@app.route('/recipes', methods = ['GET'])
def recipes():
    mycursor.execute("SELECT * FROM user")
    data = mycursor.fetchall()

    response = app.response_class(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
        )
    return response

    # print(request.json)
    # data = {"success": True}
    # response = app.response_class(
    #     response=json.dumps(data),
    #     status=200,
    #     mimetype='application/json'
    # )
    # return response



if __name__ == '__main__':
    app.run(debug = True)
