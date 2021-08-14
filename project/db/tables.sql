USE [ADX]
GO
/****** Object:  Table [dbo].[Advert]    Script Date: 14/08/2021 22:44:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Advert](
	[id] [uniqueidentifier] NOT NULL,
	[seller_id] [uniqueidentifier] NULL,
	[title] [varchar](200) NULL,
	[description] [varchar](max) NULL,
	[status] [varchar](50) NULL,
	[freeHoldPrice] [varchar](50) NULL,
	[leaseHoldPrice] [varchar](50) NULL,
	[weeklyProfit] [varchar](50) NULL,
	[monthlyProfit] [varchar](50) NULL,
	[annualProfit] [varchar](50) NULL,
	[weeklyTurnover] [varchar](50) NULL,
	[monthlyTurnover] [varchar](50) NULL,
	[annualTurnover] [varchar](50) NULL,
	[line1] [varchar](50) NULL,
	[line2] [varchar](50) NULL,
	[city] [varchar](50) NULL,
	[postcode] [varchar](50) NULL,
	[images] [varchar](1000) NULL,
	[create_date] [datetime] NULL,
 CONSTRAINT [PK_Advert] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AdvertSector]    Script Date: 14/08/2021 22:44:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AdvertSector](
	[id] [uniqueidentifier] NOT NULL,
	[advert_id] [uniqueidentifier] NULL,
	[sector_id] [uniqueidentifier] NULL,
 CONSTRAINT [PK_AdvertSector_1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AdvertTag]    Script Date: 14/08/2021 22:44:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AdvertTag](
	[id] [uniqueidentifier] NOT NULL,
	[advert_id] [uniqueidentifier] NULL,
	[tag_id] [uniqueidentifier] NULL,
 CONSTRAINT [PK_AdvertTag_1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AdvertTenure]    Script Date: 14/08/2021 22:44:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AdvertTenure](
	[id] [uniqueidentifier] NOT NULL,
	[advert_id] [uniqueidentifier] NULL,
	[tenure_id] [uniqueidentifier] NULL,
 CONSTRAINT [PK_AdvertTenure] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Content]    Script Date: 14/08/2021 22:44:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Content](
	[id] [uniqueidentifier] NOT NULL,
	[about] [varchar](max) NULL,
	[terms] [varchar](max) NULL,
	[address] [varchar](500) NULL,
	[phone] [varchar](50) NULL,
	[email] [varchar](50) NULL,
	[facebook] [varchar](200) NULL,
	[twitter] [varchar](200) NULL,
	[linkedin] [varchar](200) NULL,
	[instagram] [varchar](200) NULL,
	[youtube] [varchar](200) NULL,
 CONSTRAINT [PK_Content] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Enquiry]    Script Date: 14/08/2021 22:44:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Enquiry](
	[id] [uniqueidentifier] NOT NULL,
	[enquiry_type] [varchar](50) NULL,
	[user_type] [varchar](50) NULL,
	[first_name] [varchar](50) NULL,
	[last_name] [varchar](50) NULL,
	[email] [varchar](50) NULL,
	[location] [varchar](50) NULL,
	[property_type] [varchar](50) NULL,
	[price] [varchar](50) NULL,
	[area_size] [varchar](50) NULL,
	[create_date] [datetime] NULL,
 CONSTRAINT [PK_Enquiry] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Message]    Script Date: 14/08/2021 22:44:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Message](
	[id] [uniqueidentifier] NOT NULL,
	[advert_id] [uniqueidentifier] NULL,
	[sender] [uniqueidentifier] NULL,
	[receiver] [uniqueidentifier] NULL,
	[text] [varchar](500) NULL,
	[seen] [bit] NULL,
	[create_date] [datetime] NULL,
 CONSTRAINT [PK_Message] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PayLog]    Script Date: 14/08/2021 22:44:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PayLog](
	[id] [uniqueidentifier] NOT NULL,
	[user_id] [uniqueidentifier] NULL,
	[amount] [smallint] NULL,
	[months] [tinyint] NULL,
	[token] [varchar](50) NULL,
	[status] [varchar](50) NULL,
	[ip] [varchar](50) NULL,
	[create_date] [datetime] NULL,
	[update_date] [datetime] NULL,
 CONSTRAINT [PK_PayLog_1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sector]    Script Date: 14/08/2021 22:44:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sector](
	[id] [uniqueidentifier] NOT NULL,
	[title] [varchar](50) NULL,
 CONSTRAINT [PK_Sector] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tag]    Script Date: 14/08/2021 22:44:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tag](
	[id] [uniqueidentifier] NOT NULL,
	[title] [varchar](50) NULL,
 CONSTRAINT [PK_Tag_1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tenure]    Script Date: 14/08/2021 22:44:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tenure](
	[id] [uniqueidentifier] NOT NULL,
	[title] [varchar](100) NULL,
 CONSTRAINT [PK_Tenure] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UpgradeLog]    Script Date: 14/08/2021 22:44:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UpgradeLog](
	[id] [uniqueidentifier] NOT NULL,
	[user_id] [uniqueidentifier] NULL,
	[paylog_id] [uniqueidentifier] NULL,
	[prev_role] [varchar](50) NULL,
	[prev_seller_until] [datetime] NULL,
	[create_date] [datetime] NULL,
 CONSTRAINT [PK_PayLog] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 14/08/2021 22:44:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[id] [uniqueidentifier] NOT NULL,
	[role] [varchar](20) NULL,
	[fullname] [varchar](50) NULL,
	[email] [varchar](50) NULL,
	[phone] [varchar](50) NULL,
	[avatar] [varchar](250) NULL,
	[line1] [varchar](50) NULL,
	[line2] [varchar](50) NULL,
	[city] [varchar](50) NULL,
	[postcode] [varchar](50) NULL,
	[seller_until] [datetime] NULL,
	[active] [bit] NULL,
	[passhash] [varchar](50) NULL,
	[create_date] [datetime] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Advert] ADD  CONSTRAINT [DF_Advert_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Advert] ADD  CONSTRAINT [DF_Advert_create_date]  DEFAULT (getdate()) FOR [create_date]
GO
ALTER TABLE [dbo].[AdvertSector] ADD  CONSTRAINT [DF_AdvertSector_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[AdvertTag] ADD  CONSTRAINT [DF_AdvertTag_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[AdvertTenure] ADD  CONSTRAINT [DF_AdvertTenure_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Content] ADD  CONSTRAINT [DF_Content_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Enquiry] ADD  CONSTRAINT [DF_Enquiry_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Enquiry] ADD  CONSTRAINT [DF_Enquiry_create_date]  DEFAULT (getdate()) FOR [create_date]
GO
ALTER TABLE [dbo].[Message] ADD  CONSTRAINT [DF_Message_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Message] ADD  CONSTRAINT [DF_Message_seen]  DEFAULT ((0)) FOR [seen]
GO
ALTER TABLE [dbo].[Message] ADD  CONSTRAINT [DF_Message_create_date]  DEFAULT (getdate()) FOR [create_date]
GO
ALTER TABLE [dbo].[PayLog] ADD  CONSTRAINT [DF_PayLog_id_1]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[PayLog] ADD  CONSTRAINT [DF_PayLog_success]  DEFAULT ('pending') FOR [status]
GO
ALTER TABLE [dbo].[PayLog] ADD  CONSTRAINT [DF_PayLog_create_date_1]  DEFAULT (getdate()) FOR [create_date]
GO
ALTER TABLE [dbo].[Sector] ADD  CONSTRAINT [DF_Sector_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Tag] ADD  CONSTRAINT [DF_Tag_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Tenure] ADD  CONSTRAINT [DF_Tenure_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[UpgradeLog] ADD  CONSTRAINT [DF_PayLog_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[UpgradeLog] ADD  CONSTRAINT [DF_PayLog_create_date]  DEFAULT (getdate()) FOR [create_date]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_role]  DEFAULT ('guest') FOR [role]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_seller_until]  DEFAULT ('2000-01-01') FOR [seller_until]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_active]  DEFAULT ((1)) FOR [active]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_create_date]  DEFAULT (getdate()) FOR [create_date]
GO
