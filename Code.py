import random
import string

password ={}

# load existing password file 

try:
    with open("password.txt","r")as file:
        for line in file:
            website,pwd = line.strip().split(":")
            password[website] = pwd 
except:
    pass

def generate_password():
    chars=string.ascii_letters + string.digits + "@#$%&*"
    password = "".join(random.choice(chars) for _ in range (8))
    return password

while True:
    print("\n -------PERSONAL PASSWORD MANAGER-----")
    print("1. Save Password ")
    print("2. View password")
    print("3. Generate password")
    print("4. Exiting")

    choice =  input("enter your password ")

    if choice == "1":
        site= input(" Enter Website: ")
        pwd = input(" Enter Your Passowrd: ")

        password[site] = pwd

        with open("password.txt", "a" )  as file:
            file.write( f"{site}:{pwd}\n")

        print("Saved!!")    

    elif choice =="2":
        if not password:
            print(" No Data Found ! ")
        else:
            for site, pwd in password.items():
                print(site,":" , pwd)

    elif choice == "3":
        print("Generated Password : ", generate_password())

    elif choice == "4":
        print( " OK Byee.... ")
        break
    else:
        print(" In- valid input ")   
        
        
