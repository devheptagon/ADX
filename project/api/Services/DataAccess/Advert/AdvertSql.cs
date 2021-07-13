
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;

class AdvertSqlStrings
{
    public static string SelectSql =
        @"SELECT ADV.*, 

        (SELECT STRING_AGG(T3.TITLE, ',') FROM[ADVERT] AS T1
        INNER JOIN[ADVERTAREA] AS T2 ON T1.ID = T2.ADVERT_ID
        INNER JOIN[AREA] AS T3 ON T2.AREA_ID = T3.ID
        WHERE ADV.ID = T1.ID
        ) AS areas,

        (SELECT STRING_AGG(T3.TITLE, ',') FROM[ADVERT] AS T1
        INNER JOIN[ADVERTSECTOR] AS T2 ON T1.ID = T2.ADVERT_ID
        INNER JOIN[SECTOR] AS T3 ON T2.SECTOR_ID = T3.ID
        WHERE ADV.ID = T1.ID
        ) AS sectors,

        (SELECT STRING_AGG(T3.TITLE, ',') FROM[ADVERT] AS T1
        INNER JOIN[ADVERTTAG] AS T2 ON T1.ID = T2.ADVERT_ID
        INNER JOIN[TAG] AS T3 ON T2.TAG_ID = T3.ID
        WHERE ADV.ID = T1.ID
        ) AS tags

        FROM [ADVERT] AS ADV";

    public static string SelectByIdSql = SelectSql + " WHERE CAST(ADV.id AS VARCHAR(50)) = @advert_id";

}

