
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;

class MetaRequestSqlStrings
{
    public static string SelectSql = "Select [id],[unique_id],[app_name],[app_version],[ip],[language],[client_date],[server_date] From [MetaRequest]";
    public static string SelectByIdSql = "Select [unique_id],[app_name],[app_version],[ip],[language],[client_date],[server_date] From [MetaRequest] Where id = @id";
    public static string AddSql = "Insert Into [MetaRequest] ([unique_id],[app_name],[app_version],[ip],[language],[client_date]) VALUES(@unique_id,@app_name,@app_version,@ip,@language,@client_date); select CONVERT(int,scope_identity())";
    public static string UpdateSql = "Update [MetaRequest] Set [unique_id] = @unique_id,[app_name] = @app_name,[app_version] = @app_version,[ip] = @ip,[language] = @language,[client_date] = @client_date Where id = ";
    public static string DeleteSql = "Delete From [MetaRequest] Where id = @id";
}

