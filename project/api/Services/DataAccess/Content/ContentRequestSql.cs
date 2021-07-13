
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;

class ContentRequestSqlStrings
{
    public static string SelectSql = "Select TOP 1 * From [Content]";
    //public static string SelectByIdSql = "Select [unique_id],[app_name],[app_version],[ip],[language],[client_date],[server_date] From [MetaRequest] Where id = @id";
    //public static string AddSql = "Insert Into [MetaRequest] ([unique_id],[app_name],[app_version],[ip],[language],[client_date]) VALUES(@unique_id,@app_name,@app_version,@ip,@language,@client_date); select CONVERT(int,scope_identity())";
    public static string UpdateSql = @"Update [Content] Set 
            [about] = @about,
            [terms] = @terms,
            [address] = @address,
            [phone] = @phone,
            [email] = @email,
            [facebook] = @facebook,
            [twitter] = @twitter,
            [linkedin] = @linkedin,
            [instagram] = @instagram,
            [youtube] = @youtube 
    WHERE id = (SELECT TOP 1 id FROM [@Content])
";
    //public static string DeleteSql = "Delete From [MetaRequest] Where id = @id";
}

