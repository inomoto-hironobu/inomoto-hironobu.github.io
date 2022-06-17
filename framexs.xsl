<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="application/xml" href="framexs.xsl"?>
<!--
XSLTで実現するフレームワーク framexs
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xh="http://www.w3.org/1999/xhtml" xmlns:framexs="urn:framexs" version="1.0">
	<xsl:output encoding="UTF-8" media-type="text/html" method="html" doctype-system="about:legacy-compat"/>

	<!-- skeleton_locが指定されればXHTMLテンプレート処理を行う -->
	<xsl:param name="skeleton_loc" select="/processing-instruction('framexs.skeleton')"/>
	<xsl:param name="properties_loc" select="/processing-instruction('framexs.properties')"/>
	<xsl:param name="framexs.base" select="/processing-instruction('framexs.base')"/>

	<xsl:param name="basepath" select="concat($skeleton_loc, '/../')"/>
	<xsl:variable name="root" select="/"/>
	<xsl:variable name="xhns" select="'http://www.w3.org/1999/xhtml'"/>
	<xsl:variable name="fmxns" select="'urn:framexs'"/>
	<xsl:variable name="empty" select="''"/>
	<xsl:variable name="version" select="'1.23.0'"/>

	<xsl:key name="property" match="framexs:property" use="@name"></xsl:key>

	<xsl:template match="/">
		<xsl:message>framexs <xsl:value-of select="$version"/></xsl:message>
		<!-- 基本的な処理分けを行う。XHTMLか一般XMLか -->
		<xsl:choose>
			<xsl:when test="$skeleton_loc and namespace-uri(*[1]) = $fmxns">
				<xsl:apply-templates select="document($skeleton_loc)/*">
					<xsl:with-param name="content" select="document(/framexs:tunnel/@content)"/>
					<xsl:with-param name="properties" select="document($properties_loc)/framexs:properties"/>
				</xsl:apply-templates>
			</xsl:when>
			<xsl:when test="$skeleton_loc and namespace-uri(*[1]) = $xhns">
				<xsl:message>exec content</xsl:message>
				<xsl:apply-templates select="document($skeleton_loc)/*">
					<xsl:with-param name="content" select="$root"/>
					<xsl:with-param name="properties" select="document($properties_loc)/framexs:properties"/>
				</xsl:apply-templates>
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
		<xsl:param name="content"/>
		<xsl:message>id-d</xsl:message>
		<xsl:apply-templates mode="search-id" select="$content/xh:html">
			<xsl:with-param name="id" select="@framexs:id-d"/>
			<xsl:with-param name="self" select="false()"/>
		</xsl:apply-templates>
	</xsl:template>
	<xsl:template match="xh:*[@framexs:id-sd]">
		<xsl:param name="content"/>
		<xsl:apply-templates mode="search-id" select="$content/xh:html">
			<xsl:with-param name="id" select="@framexs:id-sd"/>
			<xsl:with-param name="self" select="true()"/>
		</xsl:apply-templates>
	</xsl:template>

	<xsl:template match="xh:*[@framexs:fetch-sd]">
		<xsl:param name="content"/>
		<xsl:variable name="name" select="@framexs:fetch-sd"/>
		<xsl:for-each select="$content/processing-instruction('framexs.fetch')">
			<xsl:if test="$name = substring-before(.,' ')">
				<xsl:apply-templates mode="content" select="document(substring-after(.,' '), $content)/*"/>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
	<xsl:template match="xh:*[@framexs:fetch-d]">
		<xsl:param name="content"/>
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
	<xsl:template match="framexs:version">
		<xsl:value-of select="$version"/>
	</xsl:template>
	<xsl:template match="framexs:title">
		<xsl:param name="content"/>
		<xsl:value-of select="$content/xh:html/xh:head/xh:title"/>
	</xsl:template>
	<xsl:template match="framexs:script">
		<xsl:param name="content"/>
		<xsl:for-each select="$content/xh:html/xh:head/xh:script">
			<xsl:choose>
				<xsl:when test="@src">
					<xsl:element name="script">
						<xsl:call-template name="replacepath">
							<xsl:with-param name="current" select="."/>
						</xsl:call-template>
					</xsl:element>
				</xsl:when>
				<xsl:otherwise>
					<xsl:copy-of select="."/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:for-each>
	</xsl:template>
	<xsl:template match="framexs:style">
		<xsl:param name="content"/>
		<xsl:for-each select="$content/xh:html/xh:head/xh:style">
			<xsl:element name="style">
				<xsl:call-template name="replacepath">
					<xsl:with-param name="current" select="."/>
				</xsl:call-template>
			</xsl:element>
		</xsl:for-each>
	</xsl:template>
	<xsl:template match="framexs:link">
		<xsl:param name="content"/>
		<xsl:for-each select="$content/xh:html/xh:head/xh:link">
			<xsl:element name="link">
				<xsl:call-template name="replacepath">
					<xsl:with-param name="current" select="."/>
				</xsl:call-template>
			</xsl:element>
		</xsl:for-each>
	</xsl:template>
	<xsl:template match="framexs:id[@name]">
		<xsl:param name="content"/>
		<xsl:apply-templates mode="search-id" select="$content/xh:html">
			<xsl:with-param name="id" select="@name"/>
			<xsl:with-param name="self" select="false()"/>
		</xsl:apply-templates>
	</xsl:template>
	<xsl:template match="framexs:meta[@name]">
		<xsl:param name="content"/>
		<xsl:variable name="name" select="@name"/>
		<xsl:for-each select="$content/xh:html/xh:head/xh:meta">
			<xsl:if test="@name = $name">
				<xsl:value-of select="@content"/>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
	<xsl:template match="framexs:meta[@property]">
		<xsl:param name="content"/>
		<xsl:variable name="property" select="@property"/>
		<xsl:for-each select="$content/xh:html/xh:head/xh:meta">
			<xsl:if test="@property = $property">
				<xsl:value-of select="@content"/>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
	<!--
		if文を定義。id,meta,property,resource
	-->
	<xsl:template match="xh:*" mode="search-id-if">
		<xsl:param name="id"/>
		<xsl:param name="content"/>
		<xsl:param name="properties"/>
		<xsl:param name="current"/>
		<xsl:choose>
			<xsl:when test="@id = $id">
				<xsl:apply-templates select="$current/node()">
					<xsl:with-param name="content" select="$content"/>
					<xsl:with-param name="properties" select="$properties"/>
				</xsl:apply-templates>
			</xsl:when>
			<xsl:otherwise>
				<xsl:apply-templates select="xh:*" mode="search-id-if">
					<xsl:with-param name="id" select="$id"/>
					<xsl:with-param name="content" select="$content"/>
					<xsl:with-param name="properties" select="$properties"/>
					<xsl:with-param name="current" select="$current"/>
				</xsl:apply-templates>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template match="framexs:if[@id]">
		<xsl:param name="content"/>
		<xsl:param name="properties"/>
		<xsl:variable name="current" select="."/>
		<xsl:apply-templates mode="search-id-if" select="$content/xh:html">
			<xsl:with-param name="id" select="@id"/>
			<xsl:with-param name="content" select="$content"/>
			<xsl:with-param name="properties" select="$properties"/>
			<xsl:with-param name="current" select="$current"/>
		</xsl:apply-templates>
	</xsl:template>
	<xsl:template match="framexs:if-meta[@name]">
		<xsl:param name="content"/>
		<xsl:param name="properties"/>
		<xsl:variable name="if-meta" select="."></xsl:variable>
		<xsl:for-each select="$content/xh:html/xh:head/xh:meta[@name and @content]">
			<xsl:choose>
				<xsl:when test="@name = $if-meta/@name and @content = $if-meta/@content">
					<xsl:apply-templates select="$if-meta/node()">
						<xsl:with-param name="content" select="$content"/>
					</xsl:apply-templates>
				</xsl:when>
				<xsl:when test="@name = $if-meta/@name and not($if-meta/@content)">
					<xsl:apply-templates select="$if-meta/node()">
						<xsl:with-param name="content" select="$content"/>
					</xsl:apply-templates>
				</xsl:when>
			</xsl:choose>
		</xsl:for-each>	
	</xsl:template>

	<xsl:template match="framexs:if-meta[@property]">
		<xsl:param name="content"/>
		<xsl:param name="properties"/>
		<xsl:variable name="property" select="@property"/>
		<xsl:variable name="if-meta" select="."/>
		<xsl:for-each select="$content/xh:html/xh:head/xh:meta">
			<xsl:choose>
				<xsl:when test="(@property = $if-meta/@property and @content = $if-meta/@content) or (@property = $if-meta/@property and not($if-meta/@content))">
					<xsl:apply-templates select="$if-meta/node()">
						<xsl:with-param name="content" select="$content"/>
						<xsl:with-param name="properties" select="$properties"/>
					</xsl:apply-templates>
				</xsl:when>
			</xsl:choose>
		</xsl:for-each>
	</xsl:template>

	<xsl:template match="framexs:properties" mode="if_property">
		<xsl:param name="current"/>
		<xsl:param name="ref"/>
		<xsl:param name="content"/>
		<xsl:param name="properties"/>
		<xsl:variable name="property" select="key('property',$ref)"/>
		<xsl:if test="$property and (($property/text() = $current/@value) or not($current/@value))">
			<xsl:apply-templates select="$current/node()">
				<xsl:with-param name="content" select="$content"/>
				<xsl:with-param name="properties" select="$properties"/>
			</xsl:apply-templates>
		</xsl:if>
	</xsl:template>
	<xsl:template match="framexs:if[@property]">
		<xsl:param name="content"/>
		<xsl:param name="properties"/>
		<xsl:apply-templates select="$properties" mode="if_property">
			<xsl:with-param name="current" select="."/>
			<xsl:with-param name="ref" select="@property"/>
			<xsl:with-param name="content" select="$content"/>
			<xsl:with-param name="properties" select="$properties"/>
		</xsl:apply-templates>
	</xsl:template>

	
	<xsl:template match="framexs:if[@resource]">
		<xsl:param name="content"/>
		<xsl:param name="properties"/>
		<xsl:variable name="name" select="@resource"/>
		<xsl:variable name="if" select="."></xsl:variable>
		<xsl:for-each select="$content/processing-instruction('framexs.resource')">
			<xsl:if test="$name = substring-before(.,' ')">
				<xsl:apply-templates select="$if/node()">
					<xsl:with-param name="content" select="$content"/>
					<xsl:with-param name="properties" select="$properties"/>
				</xsl:apply-templates>
			</xsl:if>
		</xsl:for-each>
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
		<xsl:param name="content"/>
		<xsl:variable name="name" select="@name"/>
		<xsl:for-each select="$content/processing-instruction('framexs.resource')">
			<xsl:if test="$name = substring-before(.,' ')">
				<xsl:apply-templates mode="content" select="document(substring-after(.,' '), $content)/framexs:resource/node()"/>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>

	<xsl:template match="framexs:properties" mode="pull_property">
		<xsl:param name="ref"/>
		<xsl:variable name="property" select="key('property',$ref)"/>
		<xsl:if test="$property">
			<xsl:copy-of select="$property/node()"/>
		</xsl:if>
	</xsl:template>
	<xsl:template match="framexs:property[@name]">
		<xsl:param name="properties"/>
		<xsl:if test="not($properties = '')">
			<xsl:apply-templates select="$properties" mode="pull_property">
				<xsl:with-param name="ref" select="@name"/>
			</xsl:apply-templates>
		</xsl:if>
	</xsl:template>

	<xsl:template match="framexs:attribute[@name]">
		<xsl:param name="content"/>
		<xsl:param name="properties"/>
		<xsl:param name="target"/>
		<xsl:param name="switch"/>
		<xsl:if test="$switch = 'true'">
			<xsl:attribute name="{@name}">
				<xsl:apply-templates>
					<xsl:with-param name="content" select="$content"/>
					<xsl:with-param name="properties" select="$properties"/>
					<xsl:with-param name="target" select="$target"/>
				</xsl:apply-templates>
			</xsl:attribute>
		</xsl:if>
	</xsl:template>
	<xsl:template match="framexs:import[@src]">
		<xsl:param name="content"/>
		<xsl:param name="properties"/>
		<xsl:apply-templates select="document(@src)/framexs:fragment/node()">
			<xsl:with-param name="content" select="$content"/>
			<xsl:with-param name="properties" select="$properties"/>
		</xsl:apply-templates>
	</xsl:template>
		
	<xsl:template match="xh:*" mode="search-id-list">
		<xsl:param name="id"/>
		<xsl:param name="content"/>
		<xsl:param name="properties"/>
		<xsl:param name="current"/>
		<xsl:choose>
			<xsl:when test="@id = $id">
				<!-- コンテンツの各li要素に対して処理を行う -->
				<xsl:for-each select="xh:li">
					<xsl:apply-templates select="$current/node()">
						<xsl:with-param name="content" select="$content"/>
						<xsl:with-param name="properties" select="$properties"/>
						<xsl:with-param name="target" select="."/>
					</xsl:apply-templates>
				</xsl:for-each>
			</xsl:when>
			<xsl:otherwise>
				<xsl:apply-templates select="xh:*" mode="search-id-list">
					<xsl:with-param name="id" select="$id"/>
					<xsl:with-param name="content" select="$content"/>
					<xsl:with-param name="properties" select="$properties"/>
					<xsl:with-param name="current" select="$current"/>
				</xsl:apply-templates>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template match="framexs:list[@ref-id and not(@ref-property)]">
		<xsl:param name="content"/>
		<xsl:param name="properties"/>
		<xsl:variable name="current" select="."/>
		<xsl:apply-templates mode="search-id-list" select="$content/xh:html">
			<xsl:with-param name="id" select="@ref-id"/>
			<xsl:with-param name="content" select="$content"/>
			<xsl:with-param name="properties" select="$properties"/>
			<xsl:with-param name="current" select="$current"/>
		</xsl:apply-templates>
	</xsl:template>

	<xsl:template match="framexs:list[@ref-property and not(@ref-id)]">
		<xsl:param name="content"/>
		<xsl:param name="properties"/>
		<xsl:apply-templates select="$properties" mode="list">
			<xsl:with-param name="content" select="$content"/>
			<xsl:with-param name="properties" select="$properties"/>
			<xsl:with-param name="current" select="."/>
			<xsl:with-param name="ref" select="@ref-property"></xsl:with-param>
		</xsl:apply-templates>
	</xsl:template>

	<xsl:template match="framexs:properties" mode="list">
		<xsl:param name="content"/>
		<xsl:param name="properties"/>
		<xsl:param name="current"/>
		<xsl:param name="ref"/>
		<xsl:value-of select="key('property',$ref)/text()"></xsl:value-of>
		<xsl:for-each select="key('property',$ref)/xh:li">
			<xsl:apply-templates select="$current/node()">
				<xsl:with-param name="content" select="$content"/>
				<xsl:with-param name="properties" select="$properties"/>
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
	<xsl:template match="framexs:*"></xsl:template>
	
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
		<xsl:param name="content"/>
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
		<xsl:param name="content"/>
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
		<xsl:param name="content"/>
		<xsl:param name="properties"/>
		<xsl:param name="target"/>
		<xsl:element name="{name()}">
			<xsl:if test="namespace-uri() != $fmxns">
				<xsl:call-template name="replacepath">
					<xsl:with-param name="current" select="."/>
				</xsl:call-template>
			</xsl:if>
			<xsl:apply-templates select="*">
				<xsl:with-param name="content" select="$content"/>
				<xsl:with-param name="properties" select="$properties"/>
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
		<xsl:param name="content"/>
		<xsl:param name="properties"/>
		<xsl:param name="target"/>
		<xsl:element name="{name()}">
			<xsl:if test="namespace-uri() != $fmxns">
				<xsl:call-template name="replacepath">
					<xsl:with-param name="current" select="."/>
				</xsl:call-template>
			</xsl:if>
			<xsl:apply-templates>
				<xsl:with-param name="content" select="$content"/>
				<xsl:with-param name="properties" select="$properties"/>
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