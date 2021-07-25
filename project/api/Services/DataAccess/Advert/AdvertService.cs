
using adx;
using adx.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.IO;
using System.Linq;

public class AdvertService
{

    public static List<AdvertEntity> GetAdvert(string id)
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(AdvertSqlStrings.SelectByIdSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;
                sqlCommand.Parameters.Add(new SqlParameter("@advert_id", SqlDbType.VarChar));
                sqlCommand.Parameters["@advert_id"].Value = id;

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
        var result = CreateAdvertListFromDatatable(dataTable);
        return result;
    }

    public static List<AdvertEntity> GetAdverts(AdvertFilter filter)
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            var sql = string.IsNullOrEmpty(filter.Page) ? AdvertSqlStrings.SelectSql : AdvertSqlStrings.SelectByPageSql;
            using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;

                sqlCommand.Parameters.Add(new SqlParameter("@MIN_PRICE", SqlDbType.Int));
                if (string.IsNullOrEmpty(filter.SelectedMinPrice) || filter?.SelectedMinPrice == "0")
                    sqlCommand.Parameters["@MIN_PRICE"].Value = SqlInt32.Null;
                else
                    sqlCommand.Parameters["@MIN_PRICE"].Value = filter.SelectedMinPrice;

                sqlCommand.Parameters.Add(new SqlParameter("@MAX_PRICE", SqlDbType.Int));
                if (string.IsNullOrEmpty(filter.SelectedMaxPrice) || filter?.SelectedMaxPrice == "0")
                    sqlCommand.Parameters["@MAX_PRICE"].Value = SqlInt32.Null;
                else
                    sqlCommand.Parameters["@MAX_PRICE"].Value = filter.SelectedMaxPrice;

                sqlCommand.Parameters.Add(new SqlParameter("@CITIES", SqlDbType.VarChar, -1)); //-1 = varchar(max)
                if (string.IsNullOrEmpty(filter.SelectedCities))
                    sqlCommand.Parameters["@CITIES"].Value = SqlString.Null;
                else
                    sqlCommand.Parameters["@CITIES"].Value = filter.SelectedCities;

                sqlCommand.Parameters.Add(new SqlParameter("@SECTORS", SqlDbType.VarChar, -1)); //-1 = varchar(max)
                if (string.IsNullOrEmpty(filter.SelectedSectors))
                    sqlCommand.Parameters["@SECTORS"].Value = SqlString.Null;
                else
                    sqlCommand.Parameters["@SECTORS"].Value = filter.SelectedSectors;

                sqlCommand.Parameters.Add(new SqlParameter("@TAGS", SqlDbType.VarChar, -1));
                if (string.IsNullOrEmpty(filter.SelectedKeywords))
                    sqlCommand.Parameters["@TAGS"].Value = SqlString.Null;
                else
                    sqlCommand.Parameters["@TAGS"].Value = filter.SelectedKeywords;

                sqlCommand.Parameters.Add(new SqlParameter("@TENURES", SqlDbType.VarChar, 1000));
                if (string.IsNullOrEmpty(filter.SelectedTenures))
                    sqlCommand.Parameters["@TENURES"].Value = SqlString.Null;
                else
                    sqlCommand.Parameters["@TENURES"].Value = filter.SelectedTenures;

                sqlCommand.Parameters.Add(new SqlParameter("@Page", SqlDbType.Int));
                if (string.IsNullOrEmpty(filter.Page))
                    sqlCommand.Parameters["@Page"].Value = SqlInt32.Null;
                else
                    sqlCommand.Parameters["@Page"].Value = filter.Page;

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

        List<AdvertEntity> result = CreateAdvertListFromDatatable(dataTable);
        return result;
    }

    private static List<AdvertEntity> CreateAdvertListFromDatatable(DataTable dataTable)
    {
        var result = new List<AdvertEntity>();
        foreach (DataRow row in dataTable.Rows)
        {
            var item = new AdvertEntity();
            item.id = (System.Guid)row["id"];
            item.seller_id = (System.Guid)row["seller_id"];
            item.title = row["title"] == DBNull.Value ? "" : (string)row["title"];
            item.description = row["description"] == DBNull.Value ? "" : (string)row["description"];
            item.status = row["status"] == DBNull.Value ? "" : (string)row["status"];
            item.freeHoldPrice = row["freeHoldPrice"] == DBNull.Value ? "" : (string)row["freeHoldPrice"];
            item.leaseHoldPrice = row["leaseHoldPrice"] == DBNull.Value ? "" : (string)row["leaseHoldPrice"];
            item.weeklyProfit = row["weeklyProfit"] == DBNull.Value ? "" : (string)row["weeklyProfit"];
            item.monthlyProfit = row["monthlyProfit"] == DBNull.Value ? "" : (string)row["monthlyProfit"];
            item.annualProfit = row["annualProfit"] == DBNull.Value ? "" : (string)row["annualProfit"];
            item.weeklyTurnover = row["weeklyTurnover"] == DBNull.Value ? "" : (string)row["weeklyTurnover"];
            item.monthlyTurnover = row["monthlyTurnover"] == DBNull.Value ? "" : (string)row["monthlyTurnover"];
            item.annualTurnover = row["annualTurnover"] == DBNull.Value ? "" : (string)row["annualTurnover"];
            item.line1 = row["line1"] == DBNull.Value ? "" : (string)row["line1"];
            item.line2 = row["line2"] == DBNull.Value ? "" : (string)row["line2"];
            item.city = row["city"] == DBNull.Value ? "" : (string)row["city"];
            item.postcode = row["postcode"] == DBNull.Value ? "" : (string)row["postcode"];
            item.create_date = row["create_date"] == DBNull.Value ? "" : row["create_date"].ToString();

            item.sectors = row["sectors"] == DBNull.Value ? "" : (string)row["sectors"];
            item.tags = row["tags"] == DBNull.Value ? "" : (string)row["tags"];
            item.images = row["images"] == DBNull.Value ? "" : (string)row["images"];
            item.tenures = row["tenures"] == DBNull.Value ? "" : (string)row["tenures"];

            if (row["seller"] != DBNull.Value)
            {
                var sellerInfo = row["seller"].ToString().Split('|');
                item.seller = new SellerEntity()
                {
                    fullname = sellerInfo[0],
                    email = sellerInfo[1],
                    phone = sellerInfo[2],
                    avatar = sellerInfo[3],
                    line1 = sellerInfo[4],
                    line2 = sellerInfo[5],
                    city = sellerInfo[6],
                    postcode = sellerInfo[7]
                };
            }

            result.Add(item);
        }

        return result;
    }

}
