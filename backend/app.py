import os
import boto3
import psycopg2
from dotenv import load_dotenv

load_dotenv()


# RDS settings
proxy_host_name = os.environ["PROXY_HOST_NAME"]
port = int(os.environ["PORT"])
db_name = os.environ["DB_NAME"]
db_user_name = os.environ["DB_USER_NAME"]
aws_region = os.environ["AWS_REGION"]
password = os.environ["PASSWORD"]


data = {
    "agecategory": [],
    "OccupationCategory": [],
    "OccupationList": [],
    "SalaryIndustryLocation": [],
    "IndustryYear": [],
    "SkillLevel": [],
    "OccupationSubCategory": [],
}


# Fetch RDS Auth Token
def get_auth_token():
    client = boto3.client("rds", region_name=aws_region)
    token = password
    return token


def execute_sql_command(command="", variables="", size=0):
    token = get_auth_token()

    if not command:
        print("[ERROR] No command found in the execution")
        return

    try:
        connection = psycopg2.connect(
            host=proxy_host_name,
            user=db_user_name,
            password=token,
            dbname=db_name,
            port=port,
            sslmode="require",  # Ensure SSL connection
            sslrootcert="Amazon RDS",  # Ensure you have the CA bundle for SSL connection
        )
        print("Connect successfully", connection)
        cursor = connection.cursor()

        cursor.execute(command, variables)

        if size == 0:
            result = cursor.fetchmany(1000000)
        else:
            result = cursor.fetchmany(size)

        # print(result)

        cursor.close()
        connection.close()

        return result

    except Exception as e:
        print({"Error": str(e)})
        return {"Error": str(e)}


def fetch_data(table_name, size=0):
    if not table_name:
        print("[ERROR] Error on fetching data")
    else:
        if not data.get(table_name):
            if size == 0:
                record = execute_sql_command(f"SELECT * from {table_name}")
            else:
                record = execute_sql_command(f"SELECT * from {table_name}", size=size)
            data.update(
                {
                    table_name: record,
                }
            )
            print(f"[INFO] Fetch {table_name} successfully")
        else:
            print("[ERR] Already has data in local Flask app")


def fetch_agecategory_data():
    fetch_data("agecategory")


def fetch_occupationcategory_data():
    fetch_data("OccupationCategory")


def fetch_occupationlist_data():
    fetch_data("OccupationList")


def fetch_salaryindustrylocation_data():
    fetch_data("SalaryIndustryLocation")


def fetch_industryyear_data():
    fetch_data("IndustryYear")


def fetch_skilllevel_data():
    fetch_data("SkillLevel")


def fetch_OccupationSubCategory_data():
    fetch_data("OccupationSubCategory")


def prepare_agecategory_data(records):
    for index, record in enumerate(records):
        records[index] = {
            "category": record[0],
            "values": record[1],
        }

    return records


def prepare_skilllevel_data(records):
    for index, record in enumerate(records):
        records[index] = {
            "Occupation": record[0],
            "SkillLevel": record[1],
        }

    return records


def prepare_occupationcategory_data(records):
    for index, record in enumerate(records):
        records[index] = {
            "Occupation": record[0],
            "Males": record[1],
            "Females": record[2],
        }

    return records


def prepare_occupationlist_data(records):
    for index, record in enumerate(records):
        records[index] = {
            "primary_employer_name": record[0],
            "primary_division_name": record[1],
            "primary_subdivision_name": record[2],
            "primary_group_name": record[3],
            "primary_class_name": record[4],
            "manager_category": record[5],
            "opp_gap": record[6],
        }

    return records


def prepare_salaryindustrylocation_data(records):
    for index, record in enumerate(records):
        records[index] = {
            "Stateandterritory": record[0],
            "Industry": record[1],
            "Category": record[2],
            "PersonsMedianweeklyearnings": record[3],
            "MalesMedianweeklyearnings": record[4],
            "FemalesMedianweeklyearnings": record[5],
        }

    return records


def prepare_OccupationSubCategory_data(records):
    for index, record in enumerate(records):
        records[index] = {"Industry": record[0], "gpg": record[1], "isCheck": record[2]}

    return records


def prepare_industry_year_data(records):
    for index, record in enumerate(records):
        records[index] = {"Industry": record[0], "gpg": record[1]}

    return records


from flask import Flask, jsonify, abort

app = Flask(__name__)


def data_handler(table_name):
    pass


@app.route("/agecategory", methods=["GET"])
def get_agecategory_data():
    if not data.get("agecategory"):
        fetch_agecategory_data()
        data["agecategory"] = prepare_agecategory_data(data.get("agecategory"))
    elif data.get("agecategory"):
        return jsonify(
            {
                "records": data["agecategory"],
            }
        )
    else:
        abort(404, description="Item" + str(data))

    return jsonify(
        {
            "records": data["agecategory"],
        }
    )


@app.route("/OccupationCategory", methods=["GET"])
def get_occupationcategory_data():
    if not data.get("OccupationCategory"):
        fetch_occupationcategory_data()
        data["OccupationCategory"] = prepare_occupationcategory_data(
            data.get("OccupationCategory")
        )
    elif data.get("OccupationCategory"):
        return jsonify(
            {
                "records": data["OccupationCategory"],
            }
        )
    else:
        abort(404, description="Item" + str(data))
    return jsonify(
        {
            "records": data["OccupationCategory"],
        }
    )


@app.route("/OccupationList", methods=["GET"])
def get_OccupationList_data():
    if not data.get("OccupationList"):
        fetch_occupationlist_data()
        data["OccupationList"] = prepare_occupationlist_data(data.get("OccupationList"))
    elif data.get("OccupationList"):
        return jsonify(
            {
                "records": data["OccupationList"],
            }
        )
    else:
        abort(404, description="Item" + str(data))

    return jsonify(
        {
            "records": data["OccupationList"],
        }
    )


@app.route("/SalaryIndustryLocation", methods=["GET"])
def get_salaryindustrylocation_data():
    if not data.get("SalaryIndustryLocation"):
        fetch_salaryindustrylocation_data()
        data["SalaryIndustryLocation"] = prepare_salaryindustrylocation_data(
            data.get("SalaryIndustryLocation")
        )
    elif data.get("SalaryIndustryLocation"):
        return jsonify(
            {
                "records": data["SalaryIndustryLocation"],
            }
        )
    else:
        abort(404, description="Item" + str(data))

    return jsonify(
        {
            "records": data["SalaryIndustryLocation"],
        }
    )


@app.route("/IndustryYear", methods=["GET"])
def get_industryyear_data():
    if not data.get("IndustryYear"):
        fetch_industryyear_data()
        data["IndustryYear"] = prepare_industry_year_data(data.get("IndustryYear"))
    elif data.get("IndustryYear"):
        return jsonify(
            {
                "records": data["IndustryYear"],
            }
        )
    else:
        abort(404, description="Item" + str(data))

    return jsonify(
        {
            "records": data["IndustryYear"],
        }
    )


@app.route("/SkillLevel", methods=["GET"])
def get_skilllevel_data():
    if not data.get("SkillLevel"):
        fetch_skilllevel_data()
        data["SkillLevel"] = prepare_skilllevel_data(data.get("SkillLevel"))
    elif data.get("SkillLevel"):
        return jsonify(
            {
                "records": data["SkillLevel"],
            }
        )
    else:
        abort(404, description="Item" + str(data))

    return jsonify(
        {
            "records": data["SkillLevel"],
        }
    )


@app.route("/OccupationSubCategory", methods=["GET"])
def get_occupation_sub_category():
    if not data.get("OccupationSubCategory"):
        fetch_OccupationSubCategory_data()
        data["OccupationSubCategory"] = prepare_OccupationSubCategory_data(
            data.get("OccupationSubCategory")
        )
    elif data.get("OccupationSubCategory"):
        return jsonify(
            {
                "records": data["OccupationSubCategory"],
            }
        )
    else:
        abort(404, description="Item" + str(data))

    return jsonify(
        {
            "records": data["OccupationSubCategory"],
        }
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)