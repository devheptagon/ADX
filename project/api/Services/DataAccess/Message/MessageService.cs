
using adx;
using adx.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;

public class MessageService
{

    public static List<MessageEntity> GetMessages(string userId)
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(MessageSqlStrings.SelectSql, connection))
            {
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.Parameters.Add(new SqlParameter("@user_id", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@user_id"].Value = userId;

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
        var result = new List<MessageEntity>();
        foreach (DataRow row in dataTable.Rows)
        {
            var item = new MessageEntity();
            item.id = (System.Guid)row["id"];
            item.advert_id = row["advert_id"] == DBNull.Value ? "" : row["advert_id"].ToString();
            item.advert_title = row["title"] == DBNull.Value ? "" : (string)row["title"];
            item.sender = row["sender"] == DBNull.Value ? "" : row["sender"].ToString();
            item.receiver = row["receiver"] == DBNull.Value ? "" : row["receiver"].ToString();
            item.text = row["text"] == DBNull.Value ? "" : (string)row["text"];
            item.seen = row["seen"] == DBNull.Value ? false : (bool)row["seen"];
            item.create_date = row["create_date"] == DBNull.Value ? "" : row["create_date"].ToString();
            item.sender_name = row["sender_name"] == DBNull.Value ? "" : (string)row["sender_name"];
            item.receiver_name = row["receiver_name"] == DBNull.Value ? "" : (string)row["receiver_name"];

            result.Add(item);
        }
        return result;
    }

    public static void AddMessage(MessageEntity entity)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(MessageSqlStrings.AddSql, connection))
            {
                sqlCommand.CommandType = CommandType.StoredProcedure;

                sqlCommand.Parameters.Add(new SqlParameter("@sender", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@sender"].Value = entity.sender;

                sqlCommand.Parameters.Add(new SqlParameter("@receiver", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@receiver"].Value = entity.receiver;

                sqlCommand.Parameters.Add(new SqlParameter("@text", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@text"].Value = entity.text;

                sqlCommand.Parameters.Add(new SqlParameter("@advert_id", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@advert_id"].Value = entity.advert_id;

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

    public static void UpdateSeenMessages(string receiver)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(MessageSqlStrings.UpdateSeenSql, connection))
            {
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.Parameters.Add(new SqlParameter("@receiver", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@receiver"].Value = receiver;

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
