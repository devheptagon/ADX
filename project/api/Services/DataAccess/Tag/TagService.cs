
using adx.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;

public class TagService
{

    public static List<TagEntity> GetTags(string page)
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            var sql = page != null ? TagSqlStrings.SelectByPageSql : TagSqlStrings.SelectSql;
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
        var result = new List<TagEntity>();
        foreach (DataRow row in dataTable.Rows)
        {
            var item = new TagEntity();
            item.id = (System.Guid)row["id"];
            item.title = row["title"] == DBNull.Value ? "" : (string)row["title"];
            result.Add(item);
        }
        return result;
    }

    public static List<TagEntity> GetTag(string id)
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(TagSqlStrings.SelectByIdSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;
                if (id != null)
                {
                    sqlCommand.Parameters.Add(new SqlParameter("@tag_id", SqlDbType.VarChar, 100));
                    sqlCommand.Parameters["@tag_id"].Value = id;
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
        var result = new List<TagEntity>();
        foreach (DataRow row in dataTable.Rows)
        {
            var item = new TagEntity();
            item.id = (System.Guid)row["id"];
            item.title = row["title"] == DBNull.Value ? "" : (string)row["title"];
            result.Add(item);
        }
        return result;
    }

    public static void DeleteTag(string id)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(TagSqlStrings.DeleteSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;
                sqlCommand.Parameters.Add(new SqlParameter("@tag_id", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@tag_id"].Value = id;
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

    public static void AddTag(TagEntity entity)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(TagSqlStrings.AddSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;

                sqlCommand.Parameters.Add(new SqlParameter("@title", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@title"].Value = entity.title;

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
                    //using (StreamWriter writer = new StreamWriter("log.txt", true))
                    //{
                    //    writer.Write(exp.Message);
                    //    writer.Close();
                    //}
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }

    public static void UpdateTag(TagEntity entity)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(TagSqlStrings.UpdateSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;

                sqlCommand.Parameters.Add(new SqlParameter("@id", SqlDbType.VarChar));
                sqlCommand.Parameters["@id"].Value = entity.id?.ToString();

                sqlCommand.Parameters.Add(new SqlParameter("@title", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@title"].Value = entity.title;

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
                    //using (StreamWriter writer = new StreamWriter("log.txt", true))
                    //{
                    //    writer.Write(exp.Message);
                    //    writer.Close();
                    //}
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }


}
