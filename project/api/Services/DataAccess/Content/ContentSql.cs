
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;

class ContentSqlStrings
{
    public static string SelectSql = "Select TOP 1 * From [Content]";

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
    WHERE id = (SELECT TOP 1 id FROM [Content])
";

}

