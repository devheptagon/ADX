
using adx;
using adx.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;

public class PaymentService
{
    public static PaymentEntity GetPayment(string id)
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(PaymentSqlStrings.SelectByIdSql, connection))
            {
                sqlCommand.CommandType = CommandType.StoredProcedure;
                if (id != null)
                {
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

        var item = new PaymentEntity();
        var row = dataTable.Rows.Count == 0 ? null : dataTable.Rows[0];
        if (row == null) return item;

        item.id = (System.Guid)row["id"];
        item.user_id = row["user_id"] == DBNull.Value ? "" : (string)row["user_id"];
        item.amount = row["amount"] == DBNull.Value ? "" : (string)row["amount"];
        item.months = row["months"] == DBNull.Value ? "" : (string)row["months"];
        item.token = row["token"] == DBNull.Value ? "" : (string)row["token"];
        item.status = row["status"] == DBNull.Value ? "" : (string)row["status"];
        item.ip = row["ip"] == DBNull.Value ? "" : (string)row["ip"];
        item.create_date = row["create_date"] == DBNull.Value ? "" : (string)row["create_date"];
        item.update_date = row["update_date"] == DBNull.Value ? "" : (string)row["update_date"];

        return item;
    }

    public static void AddPayment(PaymentEntity entity)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(PaymentSqlStrings.AddSql, connection))
            {
                sqlCommand.CommandType = CommandType.StoredProcedure;

                sqlCommand.Parameters.Add(new SqlParameter("@user_id", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@user_id"].Value = entity.user_id?.ToString();

                sqlCommand.Parameters.Add(new SqlParameter("@amount", SqlDbType.SmallInt));
                sqlCommand.Parameters["@amount"].Value = entity.amount;

                sqlCommand.Parameters.Add(new SqlParameter("@months", SqlDbType.TinyInt));
                sqlCommand.Parameters["@months"].Value = entity.months;

                sqlCommand.Parameters.Add(new SqlParameter("@token", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@token"].Value = entity.token;

                sqlCommand.Parameters.Add(new SqlParameter("@ip", SqlDbType.VarChar, 50));
                sqlCommand.Parameters["@ip"].Value = entity.ip;

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

    public static System.Guid UpdatePayment(PaymentEntity entity)
    {
        Guid id = Guid.Empty;
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(PaymentSqlStrings.UpdateSql, connection))
            {
                sqlCommand.CommandType = CommandType.StoredProcedure;

                sqlCommand.Parameters.Add(new SqlParameter("@user_id", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@user_id"].Value = entity.user_id?.ToString();

                sqlCommand.Parameters.Add(new SqlParameter("@token", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@token"].Value = entity.token;

                sqlCommand.Parameters.Add(new SqlParameter("@status", SqlDbType.VarChar, 50));
                sqlCommand.Parameters["@status"].Value = entity.status;

                var output = new SqlParameter("@id", SqlDbType.UniqueIdentifier);
                output.Direction = ParameterDirection.Output;
                sqlCommand.Parameters.Add(output);

                for (var i = 0; i < sqlCommand.Parameters.Count; i++)
                {
                    if (sqlCommand.Parameters[i].Value == null) sqlCommand.Parameters[i].Value = DBNull.Value;
                }

                try
                {
                    connection.Open();
                    sqlCommand.ExecuteScalar();
                    id = (System.Guid)output.Value;
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
        return id;
    }


}
