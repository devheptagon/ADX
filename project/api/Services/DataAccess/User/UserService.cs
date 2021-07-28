
using adx.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;

public class UserService
{
    public static List<UserEntity> GetUsers(string page)
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            var sql = page != null ? UserSqlStrings.SelectByPageSql : UserSqlStrings.SelectSql;
            using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;
                if (page != null)
                {
                    sqlCommand.Parameters.Add(new SqlParameter("@page", SqlDbType.VarChar, 100));
                    sqlCommand.Parameters["@page"].Value = page;
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
        var result = new List<UserEntity>();
        foreach (DataRow row in dataTable.Rows)
        {
            var item = new UserEntity();
            item.id = (System.Guid)row["id"];
            item.fullname = row["fullname"] == DBNull.Value ? "" : (string)row["fullname"];
            item.email = row["email"] == DBNull.Value ? "" : (string)row["email"];
            item.passhash = row["passhash"] == DBNull.Value ? "" : (string)row["passhash"];
            item.role = row["role"] == DBNull.Value ? "" : (string)row["role"];
            result.Add(item);
        }
        return result;
    }

    public static List<UserEntity> GetUser(string id)
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(UserSqlStrings.SelectByIdSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;
                if (id != null)
                {
                    sqlCommand.Parameters.Add(new SqlParameter("@user_id", SqlDbType.VarChar, 100));
                    sqlCommand.Parameters["@user_id"].Value = id;
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
        var result = new List<UserEntity>();
        foreach (DataRow row in dataTable.Rows)
        {
            var item = new UserEntity();
            item.id = (System.Guid)row["id"];
            item.fullname = row["fullname"] == DBNull.Value ? "" : (string)row["fullname"];
            item.email = row["email"] == DBNull.Value ? "" : (string)row["email"];
            item.passhash = row["passhash"] == DBNull.Value ? "" : (string)row["passhash"];
            item.role = row["role"] == DBNull.Value ? "" : (string)row["role"];
            result.Add(item);
        }
        return result;
    }

    public static UserEntity GetUserByCreds(string email, string passhash)
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(UserSqlStrings.SelectByCredsSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;

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

        var item = new UserEntity();
        var row = dataTable.Rows[0];
        item.id = (System.Guid)row["id"];
        item.fullname = row["fullname"] == DBNull.Value ? "" : (string)row["fullname"];
        item.email = row["email"] == DBNull.Value ? "" : (string)row["email"];
        item.role = row["role"] == DBNull.Value ? "" : (string)row["role"];
        return item;
    }

    public static void DeleteUser(string id)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(UserSqlStrings.DeleteSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;
                sqlCommand.Parameters.Add(new SqlParameter("@user_id", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@user_id"].Value = id;
                try
                {
                    connection.Open();
                    sqlCommand.ExecuteNonQuery();
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }

    public static void AddUser(UserEntity entity)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(UserSqlStrings.AddSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;

                sqlCommand.Parameters.Add(new SqlParameter("@fullname", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@fullname"].Value = entity.fullname;

                sqlCommand.Parameters.Add(new SqlParameter("@email", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@email"].Value = entity.email;

                sqlCommand.Parameters.Add(new SqlParameter("@role", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@role"].Value = entity.role;

                sqlCommand.Parameters.Add(new SqlParameter("@passhash", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@passhash"].Value = entity.passhash;

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
                sqlCommand.CommandType = CommandType.Text;

                sqlCommand.Parameters.Add(new SqlParameter("@id", SqlDbType.VarChar));
                sqlCommand.Parameters["@id"].Value = entity.id?.ToString();

                sqlCommand.Parameters.Add(new SqlParameter("@fullname", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@fullname"].Value = entity.fullname;

                sqlCommand.Parameters.Add(new SqlParameter("@email", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@email"].Value = entity.email;

                sqlCommand.Parameters.Add(new SqlParameter("@role", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@role"].Value = entity.role;

                sqlCommand.Parameters.Add(new SqlParameter("@passhash", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@passhash"].Value = entity.passhash;

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


}
