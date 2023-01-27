<?xml version="1.0" encoding="UTF-8"?>
<!--
The MIT License (MIT)

Copyright (c) 2015 ナンダカフラリ nandaka furari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
-->
<?xml-stylesheet type="application/xml" href="framexs.xsl"?>
<!--
XSLTで実現するフレームワーク framexs
-->
<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xh="http://www.w3.org/1999/xhtml"
	xmlns:framexs="urn:framexs"
	xmlns:fp="urn:framexs-properties"
	xmlns:fc="urn:framexs-commands"
	xmlns:fr="urn:framexs-resource"
	version="3.0">
	<xsl:output encoding="UTF-8" media-type="text/html" method="html" doctype-system="about:legacy-compat"/>

	<!-- skeleton_locが指定されればXHTMLテンプレート処理を行う -->
	<xsl:param name="skeleton_loc" select="/processing-instruction('framexs.skeleton')"/>
	<xsl:param name="properties_loc" select="/processing-instruction('framexs.properties')"/>
	<xsl:param name="framexs.base" select="/processing-instruction('framexs.base')"/>
	<xsl:param name="commands_loc" select="/processing-instruction('framexs.commands')"/>

	<xsl:variable name="skeleton_path">
		<xsl:choose>
			<xsl:when test="$skeleton_loc">
				<xsl:value-of select="$skeleton_loc"></xsl:value-of>
			</xsl:when>
			<xsl:when test="$commands_loc">
				<xsl:value-of select="document($commands_loc)/fc:commands/fc:skeleton/text()"></xsl:value-of>
			</xsl:when>
		</xsl:choose>
	</xsl:variable>
	<xsl:variable name="basepath" select="concat($skeleton_path,'/../')"/>
	<xsl:variable name="root" select="/"/>
	<xsl:variable name="content" select="$root"></xsl:variable>
	<xsl:variable name="xhns" select="'http://www.w3.org/1999/xhtml'"/>
	<xsl:variable name="fmxns" select="'urn:framexs'"/>
	<xsl:variable name="fpns" select="framexs-properties"/>
	<xsl:variable name="fcns" select="framexs-commands"/>
	<xsl:variable name="version" select="'1.29.2'"/>
	<xsl:key name="property" match="fp:property" use="@name"></xsl:key>
	<xsl:variable name="properties" select="document($properties_loc)/fp:properties"></xsl:variable>


	<xsl:template match="/">
		<xsl:message>framexs <xsl:value-of select="$version"/></xsl:message>
		<xsl:message><xsl:value-of select="$skeleton_path"></xsl:value-of></xsl:message>
		<!-- 基本的な処理分けを行う。XHTMLか一般XMLか -->
		<xsl:choose>
			<xsl:when test="$skeleton_path and namespace-uri(*[1]) = $xhns">
				<xsl:message>exec content</xsl:message>
				<xsl:choose>
					<xsl:when test="$skeleton_loc">
						<!-- framexs.skeletonが設定されているならコンテンツのパスを基にする-->
						<xsl:apply-templates select="document($skeleton_path,.)/*">
							<xsl:with-param name="content" select="$root"/>
						</xsl:apply-templates>
					</xsl:when>
					<xsl:when test="$commands_loc">
						<!-- framexs.commandが設定されているならコマンドファイルのパスを基にする-->
						<xsl:apply-templates select="document($skeleton_path,document($commands_loc))/*">
							<xsl:with-param name="content" select="$root"/>
						</xsl:apply-templates>
					</xsl:when>
				</xsl:choose>
			</xsl:when>
			<xsl:otherwise>
				<xsl:message>一般XML</xsl:message>
				<html>
					<head>
						<title>エラー</title>
					</head>
					<body>
						<p>framexsバージョン:<xsl:value-of select="$version"/></p>
						<p>テンプレートは名前空間(<xsl:value-of select="$xhns"/>)を持ったXHTMLを指定してください</p>
					</body>
				</html>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<!--  -->
	<xsl:template match="xh:*" mode="content">
		<xsl:element name="{name()}">
			<xsl:apply-templates mode="content" select="@*"/>
			<xsl:apply-templates mode="content" select="node()"/>
		</xsl:element>
	</xsl:template>
	
	<xsl:template match="@* | node()" mode="content">
		<xsl:copy>
			<xsl:apply-templates select="@*" mode="content"/>
			<xsl:apply-templates mode="content"/>
		</xsl:copy>
	</xsl:template>

	<xsl:template match="xh:*" mode="search-id">
		<xsl:param name="id"/>
		<xsl:param name="self" select="false()"/>
		<xsl:choose>
			<xsl:when test="@id = $id">
				<xsl:choose>
					<xsl:when test="$self">
						<xsl:apply-templates mode="content" select="."/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:apply-templates mode="content" select="node()"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:otherwise>
				<xsl:apply-templates select="xh:*" mode="search-id">
					<xsl:with-param name="id" select="$id"/>
					<xsl:with-param name="self" select="$self"/>
				</xsl:apply-templates>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template match="xh:*[@framexs:id-d]">
		<xsl:message>id-d</xsl:message>
		<xsl:apply-templates mode="search-id" select="$content/xh:html">
			<xsl:with-param name="id" select="@framexs:id-d"/>
			<xsl:with-param name="self" select="false()"/>
		</xsl:apply-templates>
	</xsl:template>
	<xsl:template match="xh:*[@framexs:id-sd]">
		<xsl:apply-templates mode="search-id" select="$content/xh:html">
			<xsl:with-param name="id" select="@framexs:id-sd"/>
			<xsl:with-param name="self" select="true()"/>
		</xsl:apply-templates>
	</xsl:template>

	<xsl:template match="xh:*[@framexs:fetch-sd]">
		<xsl:variable name="name" select="@framexs:fetch-sd"/>
		<xsl:for-each select="$content/processing-instruction('framexs.fetch')">
			<xsl:if test="$name = substring-before(.,' ')">
				<xsl:apply-templates mode="content" select="document(substring-after(.,' '), $content)/*"/>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
	<xsl:template match="xh:*[@framexs:fetch-d]">
		<xsl:variable name="name" select="@framexs:fetch-d"/>
		<xsl:for-each select="$content/processing-instruction('framexs.fetch')">
			<xsl:if test="$name = substring-before(.,' ')">
				<xsl:apply-templates mode="content" select="document(substring-after(.,' '), $content)/*[1]/*"/>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>

	<!--  -->
	<xsl:template match="*">
		<xsl:copy-of select="."/>
	</xsl:template>
	<!--
		framexs要素
	-->
	<!-- スタイルシートからの呼び出しタグ -->
	<xsl:template match="framexs:version">
		<xsl:value-of select="$version"/>
	</xsl:template>
	<xsl:template match="framexs:basepath">
		<xsl:value-of select="$basepath"/>
	</xsl:template>
	<!-- コンテンツからの呼び出しタグ -->
	<xsl:template match="framexs:title">
		<xsl:value-of select="$content/xh:html/xh:head/xh:title"/>
	</xsl:template>
	<xsl:template match="framexs:script">
		<xsl:for-each select="$content/xh:html/xh:head/xh:script">
			<xsl:copy-of select="."/>
		</xsl:for-each>
	</xsl:template>
	<xsl:template match="framexs:style">
		<xsl:for-each select="$content/xh:html/xh:head/xh:style">
			<xsl:copy-of select="."/>
		</xsl:for-each>
	</xsl:template>
	<xsl:template match="framexs:link">
		<xsl:for-each select="$content/xh:html/xh:head/xh:link">
			<xsl:copy-of select="."/>
		</xsl:for-each>
	</xsl:template>
	<xsl:template match="framexs:id[@name]">
		<xsl:apply-templates mode="search-id" select="$content/xh:html">
			<xsl:with-param name="id" select="@name"/>
			<xsl:with-param name="self" select="false()"/>
		</xsl:apply-templates>
	</xsl:template>
	<xsl:template match="framexs:meta[@name]">
		<xsl:variable name="name" select="@name"/>
		<xsl:for-each select="$content/xh:html/xh:head/xh:meta">
			<xsl:if test="@name = $name">
				<xsl:value-of select="@content"/>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
	<xsl:template match="framexs:meta[@property]">
		<xsl:variable name="property" select="@property"/>
		<xsl:for-each select="$content/xh:html/xh:head/xh:meta">
			<xsl:if test="@property = $property">
				<xsl:value-of select="@content"/>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
	<!-- framexs-propertisファイルの呼び出し -->
	<xsl:template match="framexs:property[@name]">
		<xsl:variable name="exists">
			<xsl:apply-templates select="$properties" mode="property_exists">
				<xsl:with-param name="ref" select="@name"/>
			</xsl:apply-templates>
		</xsl:variable>
		<xsl:choose>
			<xsl:when test="$exists = 'true'">
				<xsl:apply-templates select="$properties" mode="pull_property">
					<xsl:with-param name="ref" select="@name"/>
				</xsl:apply-templates>
			</xsl:when>
			<xsl:when test="$properties/fp:base[@href]">
				<xsl:apply-templates select="document($properties/fp:base/@href,$properties)/fp:properties" mode="pull_property">
					<xsl:with-param name="ref" select="@name"/>
				</xsl:apply-templates>
			</xsl:when>
		</xsl:choose>
	</xsl:template>
	
	<!--
		if文を定義。id,meta,property,resource
	-->
	<xsl:template match="xh:*" mode="search-id-if">
		<xsl:param name="id"/>
		<xsl:param name="current"/>
		<xsl:choose>
			<xsl:when test="@id = $id">
				<xsl:apply-templates select="$current/node()">
				</xsl:apply-templates>
			</xsl:when>
			<xsl:otherwise>
				<xsl:apply-templates select="xh:*" mode="search-id-if">
					<xsl:with-param name="id" select="$id"/>
					<xsl:with-param name="current" select="$current"/>
				</xsl:apply-templates>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template match="framexs:if[@id]">
		<xsl:variable name="current" select="."/>
		<xsl:apply-templates mode="search-id-if" select="$content/xh:html">
			<xsl:with-param name="id" select="@id"/>
			<xsl:with-param name="current" select="$current"/>
		</xsl:apply-templates>
	</xsl:template>
	<!--
		<framexs:if-meta name="test"/>	は <meta name="test" content="val"/>
		<framexs:if-meta property="test"/>	は <meta property="test" content="val"/>
		があれば正としてapply-templatesを発動する
	-->
	<xsl:template match="framexs:if-meta[@name]">
		<xsl:param name="properties"/>
		<xsl:variable name="current" select="."></xsl:variable>
		<xsl:for-each select="$content/xh:html/xh:head/xh:meta[@name and @content]">
			<xsl:choose>
				<!-- if-metaにnameとcontentの値がある場合は、どちらも一致しているときに処理 -->
				<xsl:when test="@name = $current/@name and @content = $current/@content">
					<xsl:apply-templates select="$current/node()">
					</xsl:apply-templates>
				</xsl:when>
				<!-- if-metaにnameだけある場合はnameが一致しているだけで処理-->
				<xsl:when test="@name = $current/@name and not($current/@content)">
					<xsl:apply-templates select="$current/node()">
					</xsl:apply-templates>
				</xsl:when>
			</xsl:choose>
		</xsl:for-each>	
	</xsl:template>

	<xsl:template match="framexs:if-meta[@property]">
		<xsl:variable name="property" select="@property"/>
		<xsl:variable name="current" select="."/>
		<xsl:for-each select="$content/xh:html/xh:head/xh:meta">
			<xsl:choose>
				<xsl:when test="@property = $current/@property and @content = $current/@content">
					<xsl:apply-templates select="$current/node()">
					</xsl:apply-templates>
				</xsl:when>
				<xsl:when test="@property = $current/@property and not($current/@content)">
					<xsl:apply-templates select="$current/node()">
					</xsl:apply-templates>
				</xsl:when>
			</xsl:choose>
		</xsl:for-each>
	</xsl:template>
	
	<xsl:template match="fp:properties" mode="if_property">
		<xsl:param name="current"/>
		<xsl:param name="ref"/>
		<xsl:variable name="property" select="key('property',$ref)"/>
		<!--  -->
		<xsl:if test="count($property) != 0 and (($property/text() = $current/@value) or not($current/@value))">
			<xsl:apply-templates select="$current/node()">
			</xsl:apply-templates>
		</xsl:if>
	</xsl:template>

	<xsl:template match="fp:properties" mode="property_exists">
		<xsl:param name="ref"/>
		<xsl:if test="key('property',$ref)">true</xsl:if>
	</xsl:template>

	<xsl:template match="framexs:if[@property]">
		<xsl:variable name="exists">
			<xsl:apply-templates select="$properties" mode="property_exists">
				<xsl:with-param name="ref" select="@property"></xsl:with-param>
			</xsl:apply-templates>
		</xsl:variable>
		<xsl:choose>
			<xsl:when test="$exists = 'true'">
				<xsl:apply-templates select="$properties" mode="if_property">
					<xsl:with-param name="current" select="."/>
					<xsl:with-param name="ref" select="@property"/>
				</xsl:apply-templates>
			</xsl:when>
			<xsl:when test="$properties/fp:base[@href]">
				<xsl:apply-templates select="document($properties/fp:base/@href,$properties)/fp:properties" mode="if_property">
					<xsl:with-param name="current" select="."/>
					<xsl:with-param name="ref" select="@property"/>
				</xsl:apply-templates>
			</xsl:when>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="framexs:if[@resource]">
		<xsl:variable name="name" select="@resource"/>
		<xsl:variable name="current" select="."></xsl:variable>
		<xsl:variable name="resource-exists">
			<xsl:for-each select="$content/processing-instruction('framexs.resource')">
				<xsl:if test="$name = substring-before(.,' ')">
					<xsl:text>true</xsl:text>
				</xsl:if>
			</xsl:for-each>
		</xsl:variable>

		<xsl:choose>
			<xsl:when test="$resource-exists = 'true'">
				<xsl:apply-templates select="$current/node()"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:variable name="commands" select="$content/processing-instruction('framexs.commands')"/>
				<xsl:if test="$commands">
					<xsl:if test="document($commands)">
						<xsl:for-each select="document($commands)/fc:commands/fc:resource">
							<xsl:if test="$name = substring-before(.,' ')">
								<xsl:apply-templates select="$current/node()"/>
							</xsl:if>
						</xsl:for-each>
					</xsl:if>
				</xsl:if>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<!--
		<?framexs:resource hoge resource/hoge.xml?>
		で指定し次のXMLを呼出しframexs:reourceの子孫ノードを展開する。
		<framexs:resource xmlns:framexs="urn:framexs" xmlns="http://www.w3.org/1999/xhtml">
			<li>item1</li>
			<li>item2</li>
		</framexs:resource>
	-->
	<xsl:template match="framexs:resource[@name]">
		<xsl:variable name="name" select="@name"></xsl:variable>
		<xsl:choose>
			<!-- framexs.resourceに対しての処理 -->
			<xsl:when test="$content/processing-instruction('framexs.resource')">
				<xsl:for-each select="$content/processing-instruction('framexs.resource')">
					<xsl:if test="$name = substring-before(.,' ')">
						<xsl:call-template name="resource">
							<xsl:with-param name="src" select="substring-after(.,' ')"/>
						</xsl:call-template>
					</xsl:if>
				</xsl:for-each>
			</xsl:when>
			<!-- framexs.commandsで指定されたコマンドファイルからresourceを探し出す -->
			<xsl:when test="document($commands_loc)/fc:commands/fc:resource">
				<xsl:for-each select="document($commands_loc)/fc:commands/fc:resource">
					<xsl:if test="$name = substring-before(text(),' ')">
						<xsl:call-template name="resource">
							<xsl:with-param name="src" select="substring-after(text(),' ')"/>
						</xsl:call-template>
					</xsl:if>
				</xsl:for-each>
			</xsl:when>
		</xsl:choose>
	</xsl:template>
	<!-- srcで指定されたコマンドファイルを呼出し、処理を行う。 -->
	<xsl:template name="resource">
		<xsl:param name="src"/>
		<xsl:variable name="resource" select="document($src)"></xsl:variable>
		<xsl:choose>
			<xsl:when test="$resource">
				<xsl:apply-templates mode="content" select="$resource/fr:resource/node()"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:message>読み込み失敗：<xsl:value-of select="$src"/></xsl:message>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	
	<xsl:template match="fp:properties" mode="pull_property">
		<xsl:param name="ref"/>
		<xsl:variable name="property" select="key('property',$ref)"/>
		<xsl:if test="$property">
			<xsl:copy-of select="$property/node()"/>
		</xsl:if>
	</xsl:template>
	<xsl:template name="property_value">
		<xsl:param name="name"/>
		<xsl:variable name="exists">
			<xsl:apply-templates select="$properties" mode="property_exists">
				<xsl:with-param name="ref" select="$name"/>
			</xsl:apply-templates>
		</xsl:variable>
		<xsl:choose>
			<xsl:when test="$exists = 'true'">
				<xsl:apply-templates select="$properties" mode="pull_property">
					<xsl:with-param name="ref" select="$name"/>
				</xsl:apply-templates>
			</xsl:when>
			<xsl:when test="$properties/fp:base[@href]">
				<xsl:apply-templates select="document($properties/fp:base/@href,$properties)/fp:properties" mode="pull_property">
					<xsl:with-param name="ref" select="$name"/>
				</xsl:apply-templates>
			</xsl:when>
		</xsl:choose>
	</xsl:template>

	<!--選択式の定義-->
	<xsl:template match="framexs:switch">
		<xsl:variable name="name" select="@property"/>
		<xsl:variable name="val">
			<xsl:call-template name="property_value">
				<xsl:with-param name="name" select="$name"/>
			</xsl:call-template>
		</xsl:variable>
		<xsl:apply-templates select="framexs:case">
			<xsl:with-param name="val" select="$val"/>
		</xsl:apply-templates>
	</xsl:template>
	<xsl:template match="framexs:case">
		<xsl:param name="val"/>
		<xsl:if test="$val = @value">
			<xsl:apply-templates/>
		</xsl:if>
	</xsl:template>

	<xsl:template match="framexs:attribute[@name]">
		<xsl:param name="target"/>
		<xsl:param name="switch"/>
		<xsl:if test="$switch = 'true'">
			<xsl:attribute name="{@name}">
				<xsl:apply-templates>
					<xsl:with-param name="target" select="$target"/>
				</xsl:apply-templates>
			</xsl:attribute>
		</xsl:if>
	</xsl:template>

	<!--テキストを出力する-->
	<xsl:template match="framexs:text">
		<xsl:value-of select="."/>
	</xsl:template>

	<!-- srcで指定されたXMLのフラグメントを引っ張る-->
	<xsl:template match="framexs:import[@src]">
		<xsl:apply-templates select="document(@src)/framexs:fragment/node()">
		</xsl:apply-templates>
	</xsl:template>
		
	<xsl:template match="xh:*" mode="search-id-list">
		<xsl:param name="id"/>
		<xsl:param name="current"/>
		<xsl:choose>
			<xsl:when test="@id = $id">
				<!-- コンテンツの各li要素に対して処理を行う -->
				<xsl:for-each select="xh:li">
					<xsl:apply-templates select="$current/node()">
						<xsl:with-param name="target" select="."/>
					</xsl:apply-templates>
				</xsl:for-each>
			</xsl:when>
			<xsl:otherwise>
				<xsl:apply-templates select="xh:*" mode="search-id-list">
					<xsl:with-param name="id" select="$id"/>
					<xsl:with-param name="current" select="$current"/>
				</xsl:apply-templates>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template match="framexs:list[@ref-id and not(@ref-property)]">
		<xsl:variable name="current" select="."/>
		<xsl:apply-templates mode="search-id-list" select="$content/xh:html">
			<xsl:with-param name="id" select="@ref-id"/>
			<xsl:with-param name="current" select="$current"/>
		</xsl:apply-templates>
	</xsl:template>

	<xsl:template match="framexs:list[@ref-property and not(@ref-id)]">
		<xsl:variable name="exists">
			<xsl:apply-templates select="$properties" mode="property_exists">
				<xsl:with-param name="ref" select="@ref-property"></xsl:with-param>
			</xsl:apply-templates>
		</xsl:variable>
		<xsl:choose>
			<xsl:when test="$exists = 'true'">
				<xsl:apply-templates select="$properties" mode="list">
					<xsl:with-param name="current" select="."/>
					<xsl:with-param name="ref" select="@ref-property"/>
				</xsl:apply-templates>
			</xsl:when>
			<xsl:when test="$properties/fp:base[@href]">
				<xsl:apply-templates select="document($properties/fp:base/@href,$properties)/fp:properties" mode="list">
					<xsl:with-param name="current" select="."/>
					<xsl:with-param name="ref" select="@ref-property"/>
				</xsl:apply-templates>
			</xsl:when>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="fp:properties" mode="list">
		<xsl:param name="current"/>
		<xsl:param name="ref"/>
		<xsl:variable name="property" select="key('property',$ref)"/>
		<xsl:for-each select="$property/xh:li">
			<xsl:apply-templates select="$current/node()">
				<xsl:with-param name="target" select="."/>
			</xsl:apply-templates>
		</xsl:for-each>
	</xsl:template>

	<xsl:template match="framexs:item">
		<xsl:param name="target"/>
		<xsl:apply-templates select="$target/node()"/>
	</xsl:template>

	<xsl:template match="framexs:item-attr[@name]">
		<xsl:param name="target"></xsl:param>
		<xsl:variable name="name" select="@name"/>
		<xsl:for-each select="$target/@*">
			<xsl:if test="name() = $name">
				<xsl:value-of select="."/>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>

	<!-- 定義されていないframexs要素は何もしない -->
	<xsl:template match="framexs:*">
		<xsl:message>error</xsl:message>
	</xsl:template>
	
	<!-- コンテンツにframexs.baseがあるならbaseのhrefを上書きする -->
	<xsl:template match="xh:base[@framexs:base='on']">
		<xsl:element name="base">
			<xsl:for-each select="@*">
				<xsl:copy-of select="."/>
				<xsl:if test="name() = 'href' and $framexs.base">
					<xsl:attribute name="href"><xsl:value-of select="$framexs.base"/></xsl:attribute>
				</xsl:if>
			</xsl:for-each>
		</xsl:element>
	</xsl:template>
	<!-- 何も出力しない -->
	<xsl:template match="xh:*[@framexs:print='no']"/>

	<!-- meta要素は特別な扱いをする -->
	<xsl:template name="metatemplate">
		<xsl:param name="target"/>
		<xsl:param name="base"/>
		<xsl:element name="meta">
			<xsl:for-each select="@*">
				<xsl:choose>
					<xsl:when test="name() = 'content'">
						<xsl:attribute name="{name()}"><xsl:value-of select="$target/@content"/><xsl:value-of select="$base/@content"/></xsl:attribute>
					</xsl:when>
					<xsl:otherwise>
						<xsl:attribute name="{name()}"><xsl:value-of select="."/></xsl:attribute>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:for-each>
		</xsl:element>
	</xsl:template>

	<xsl:template match="xh:meta[@framexs:fix]">
		<xsl:element name="{name()}">
			<xsl:for-each select="@*[not(namespace-uri(.) = $fmxns)]">
				<xsl:attribute name="{name()}"><xsl:value-of select="."/></xsl:attribute>
			</xsl:for-each>
		</xsl:element>
	</xsl:template>

	<xsl:template match="xh:meta[@name and not(@framexs:fix)]">
		<xsl:variable name="base" select="."/>
		<xsl:for-each select="$content/xh:html/xh:head/xh:meta[@name]">
			<xsl:variable name="target" select="."/>
			<xsl:if test="$base/@name=$target/@name">
				<xsl:call-template name="metatemplate">
					<xsl:with-param name="base" select="$base"/>
					<xsl:with-param name="target" select="$target"/>
				</xsl:call-template>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
	
	<xsl:template match="xh:meta[@property and not(@framexs:fix)]">
		<xsl:variable name="base" select="."/>
		<xsl:for-each select="$content/xh:html/xh:head/xh:meta[@property]">
			<xsl:variable name="target" select="."/>
			<xsl:if test="$base/@property=$target/@property">
				<xsl:call-template name="metatemplate">
					<xsl:with-param name="base" select="$base"/>
					<xsl:with-param name="target" select="$target"/>
				</xsl:call-template>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
	<!-- 直下にframexs:attributeがあることを期待する -->
	<xsl:template match="xh:*[@framexs:element]">
		<xsl:param name="properties"/>
		<xsl:param name="target"/>
		<xsl:element name="{name()}">
			<xsl:if test="namespace-uri() != $fmxns">
				<xsl:call-template name="replacepath">
					<xsl:with-param name="current" select="."/>
				</xsl:call-template>
			</xsl:if>
			<xsl:apply-templates select="*">
				<xsl:with-param name="target" select="$target"/>
				<xsl:with-param name="switch" select="'true'"/>
			</xsl:apply-templates>
		</xsl:element>
	</xsl:template>
	
	<!-- パスの解決アルゴリズム -->
	<xsl:template name="replacepath">
		<xsl:param name="current"/>
		<xsl:for-each select="$current/@*">
			<xsl:choose>
				<xsl:when test="name() = 'src' or name() = 'href' or name() = 'data'">
					<xsl:variable name="absolute">
						<xsl:call-template name="is-absolute">
							<xsl:with-param name="uri" select="."></xsl:with-param>
						</xsl:call-template>
					</xsl:variable>
					<xsl:attribute name="{name()}">
						<xsl:if test="not($absolute = 'true') and not(starts-with(., '#'))">
							<xsl:value-of select="$basepath"/>
						</xsl:if>
						<xsl:value-of select="."/>
					</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:if test="namespace-uri() != 'urn:framexs'">
						<xsl:copy-of select="."/>
					</xsl:if>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:for-each>
	</xsl:template>

	<!-- テンプレートの一般のXHTML要素に対応する -->
	<xsl:template match="xh:*">
		<xsl:param name="target"/>
		<xsl:element name="{name()}">
			<xsl:if test="namespace-uri() != $fmxns">
				<xsl:call-template name="replacepath">
					<xsl:with-param name="current" select="."/>
				</xsl:call-template>
			</xsl:if>
			<xsl:apply-templates>
				<xsl:with-param name="target" select="$target"/>
			</xsl:apply-templates>
		</xsl:element>
	</xsl:template>

	<!--文字列を受け取ってそれが絶対URIかを判定する-->	
	<xsl:template name="is-absolute">
		<xsl:param name="uri" />

		<xsl:variable name="uri-has-scheme">
			<xsl:call-template name="is-valid-scheme">
				<xsl:with-param name="scheme" select="substring-before($uri, ':')" />
			</xsl:call-template>
		</xsl:variable>

		<xsl:value-of select="starts-with($uri, '/') or ($uri-has-scheme = 'true')" />
	</xsl:template>

	<xsl:template name="is-valid-scheme">
		<xsl:param name="scheme" />

		<xsl:variable name="alpha">
			<xsl:text>ABCDEFGHIJKLMNOPQRSTUVWXYZ</xsl:text>
			<xsl:text>abcdefghijklmnopqrstuvwxyz</xsl:text>
		</xsl:variable>
		<xsl:variable name="following-chars">
			<xsl:value-of select="$alpha" />
			<xsl:text>0123456789</xsl:text>
			<xsl:text>+-.</xsl:text>
		</xsl:variable>

		<xsl:value-of
			select="
				$scheme
				and not(translate(substring($scheme, 1, 1), $alpha, ''))
				and not(translate(substring($scheme, 2), $following-chars, ''))"
		 />
	</xsl:template>
</xsl:stylesheet>