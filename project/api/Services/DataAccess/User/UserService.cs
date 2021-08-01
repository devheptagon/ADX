
using adx;
using adx.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;

public class UserService
{

    public static List<UserEntity> GetSellers()
    {
        var users = GetUsers(null);
        var result = new List<UserEntity>();
        result.AddRange(users.Where(u => u.role == UserRole.Admin));
        result.AddRange(users.Where(u => u.role == UserRole.Seller));

        return result;
    }

    public static List<UserEntity> GetUsers(string page)
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            var sql = page != null ? UserSqlStrings.SelectByPageSql : UserSqlStrings.SelectSql;
            using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
            {
                sqlCommand.CommandType = CommandType.StoredProcedure;
                if (page != null)
                {
                    sqlCommand.Parameters.Add(new SqlParameter("@page", SqlDbType.TinyInt));
                    sqlCommand.Parameters["@page"].Value = page;

                    sqlCommand.Parameters.Add(new SqlParameter("@page_size", SqlDbType.TinyInt));
                    sqlCommand.Parameters["@page_size"].Value = Constants.PAGE_SIZE;
                }

                try
                {
                    connection.Open();
                    using (SqlDataReader dataReader = sqlCommand.ExecuteReader())
                    {
                        dataTable.Load(dataReader);
                        dataReader.Close();
                    }
                }
                finally
                {
                    connection.Close();
                }
            }
        }

        var result = CreateUserListFromDatatable(dataTable);
        return result;
    }

    public static List<UserEntity> GetUser(string id)
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(UserSqlStrings.SelectByIdSql, connection))
            {
                sqlCommand.CommandType = CommandType.StoredProcedure;
                if (id != null)
                {
                    //id = user_id or user_id
                    sqlCommand.Parameters.Add(new SqlParameter("@id", SqlDbType.VarChar, 100));
                    sqlCommand.Parameters["@id"].Value = id;
                }

                try
                {
                    connection.Open();
                    using (SqlDataReader dataReader = sqlCommand.ExecuteReader())
                    {
                        dataTable.Load(dataReader);
                        dataReader.Close();
                    }
                }
                finally
                {
                    connection.Close();
                }
            }
        }
        var result = CreateUserListFromDatatable(dataTable);

        return result;
    }

    public static UserEntity GetUserByCreds(string email, string passhash)
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(UserSqlStrings.SelectByCredsSql, connection))
            {
                sqlCommand.CommandType = CommandType.StoredProcedure;

                sqlCommand.Parameters.Add(new SqlParameter("@email", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@email"].Value = email;

                sqlCommand.Parameters.Add(new SqlParameter("@passhash", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@passhash"].Value = passhash;

                try
                {
                    connection.Open();
                    using (SqlDataReader dataReader = sqlCommand.ExecuteReader())
                    {
                        dataTable.Load(dataReader);
                        dataReader.Close();
                    }
                }
                finally
                {
                    connection.Close();
                }
            }
        }

        if (dataTable.Rows.Count == 0) return null;

        var result = CreateUserListFromDatatable(dataTable);

        return result.First();
    }

    public static void AddUser(UserEntity entity)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(UserSqlStrings.AddSql, connection))
            {
                sqlCommand.CommandType = CommandType.StoredProcedure;

                sqlCommand.Parameters.Add(new SqlParameter("@fullname", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@fullname"].Value = entity.fullname;

                sqlCommand.Parameters.Add(new SqlParameter("@email", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@email"].Value = entity.email;

                sqlCommand.Parameters.Add(new SqlParameter("@phone", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@phone"].Value = entity.phone;

                sqlCommand.Parameters.Add(new SqlParameter("@avatar", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@avatar"].Value = entity.avatar;

                sqlCommand.Parameters.Add(new SqlParameter("@line1", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@line1"].Value = entity.line1;

                sqlCommand.Parameters.Add(new SqlParameter("@line2", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@line2"].Value = entity.line2;

                sqlCommand.Parameters.Add(new SqlParameter("@city", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@city"].Value = entity.city;

                sqlCommand.Parameters.Add(new SqlParameter("@postcode", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@postcode"].Value = entity.postcode;

                sqlCommand.Parameters.Add(new SqlParameter("@passhash", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@passhash"].Value = entity.password;

                for (var i = 0; i < sqlCommand.Parameters.Count; i++)
                {
                    if (sqlCommand.Parameters[i].Value == null) sqlCommand.Parameters[i].Value = DBNull.Value;
                }

                try
                {
                    connection.Open();
                    sqlCommand.ExecuteScalar();
                }
                catch (Exception exp)
                {
                    Logger.LogError(exp.Message);
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }

    public static void UpdateUser(UserEntity entity)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(UserSqlStrings.UpdateSql, connection))
            {
                sqlCommand.CommandType = CommandType.StoredProcedure;

                sqlCommand.Parameters.Add(new SqlParameter("@id", SqlDbType.VarChar));
                sqlCommand.Parameters["@id"].Value = entity.id?.ToString();

                sqlCommand.Parameters.Add(new SqlParameter("@fullname", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@fullname"].Value = entity.fullname;

                sqlCommand.Parameters.Add(new SqlParameter("@email", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@email"].Value = entity.email;

                sqlCommand.Parameters.Add(new SqlParameter("@phone", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@phone"].Value = entity.phone;

                sqlCommand.Parameters.Add(new SqlParameter("@avatar", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@avatar"].Value = entity.avatar;

                sqlCommand.Parameters.Add(new SqlParameter("@line1", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@line1"].Value = entity.line1;

                sqlCommand.Parameters.Add(new SqlParameter("@line2", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@line2"].Value = entity.line2;

                sqlCommand.Parameters.Add(new SqlParameter("@city", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@city"].Value = entity.city;

                sqlCommand.Parameters.Add(new SqlParameter("@postcode", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@postcode"].Value = entity.postcode;

                for (var i = 0; i < sqlCommand.Parameters.Count; i++)
                {
                    if (sqlCommand.Parameters[i].Value == null) sqlCommand.Parameters[i].Value = DBNull.Value;
                }

                try
                {
                    connection.Open();
                    sqlCommand.ExecuteScalar();
                }
                catch (Exception exp)
                {
                    Logger.LogError(exp.Message);
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }

    public static void UpdateUserActivity(UserEntity entity)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(UserSqlStrings.UpdateActivitySql, connection))
            {
                sqlCommand.CommandType = CommandType.StoredProcedure;

                sqlCommand.Parameters.Add(new SqlParameter("@id", SqlDbType.VarChar));
                sqlCommand.Parameters["@id"].Value = entity.id?.ToString();

                sqlCommand.Parameters.Add(new SqlParameter("@active", SqlDbType.Bit));
                sqlCommand.Parameters["@active"].Value = entity.active;

                for (var i = 0; i < sqlCommand.Parameters.Count; i++)
                {
                    if (sqlCommand.Parameters[i].Value == null) sqlCommand.Parameters[i].Value = DBNull.Value;
                }

                try
                {
                    connection.Open();
                    sqlCommand.ExecuteScalar();
                }
                catch (Exception exp)
                {
                    Logger.LogError(exp.Message);
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }

    public static void ResetPassword(string email, string passhash)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(UserSqlStrings.ResetPasswordSql, connection))
            {
                sqlCommand.CommandType = CommandType.StoredProcedure;

                sqlCommand.Parameters.Add(new SqlParameter("@email", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@email"].Value = email;

                sqlCommand.Parameters.Add(new SqlParameter("@passhash", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@passhash"].Value = passhash;

                try
                {
                    connection.Open();
                    sqlCommand.ExecuteScalar();
                }
                catch (Exception exp)
                {
                    Logger.LogError(exp.Message);
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }



    private static List<UserEntity> CreateUserListFromDatatable(DataTable dataTable)
    {
        var result = new List<UserEntity>();
        foreach (DataRow row in dataTable.Rows)
        {
            var item = new UserEntity();
            item.id = (System.Guid)row["id"];
            item.role = row["role"] == DBNull.Value ? "" : (string)row["role"];
            item.fullname = row["fullname"] == DBNull.Value ? "" : (string)row["fullname"];
            item.email = row["email"] == DBNull.Value ? "" : (string)row["email"];
            item.phone = row["phone"] == DBNull.Value ? "" : (string)row["phone"];
            item.avatar = row["avatar"] == DBNull.Value ? "" : (string)row["avatar"];
            item.line1 = row["line1"] == DBNull.Value ? "" : (string)row["line1"];
            item.line2 = row["line2"] == DBNull.Value ? "" : (string)row["line2"];
            item.city = row["city"] == DBNull.Value ? "" : (string)row["city"];
            item.postcode = row["postcode"] == DBNull.Value ? "" : (string)row["postcode"];
            item.active = row["active"] == DBNull.Value ? false : (bool)row["active"];
            //TODO: seller until

            result.Add(item);
        }

        return result;
    }
}
