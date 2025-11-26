(function(global){
  const registry = {
    max: global.COMPANY_BARS_CONFIG_MAX || null,
    toni: global.COMPANY_BARS_CONFIG_TONI || null,
    ahmed: global.COMPANY_BARS_CONFIG_AHMED || null,
    maria: global.COMPANY_BARS_CONFIG_MARIA || null,
    marcela: global.COMPANY_BARS_CONFIG_MARCELA || null
  };

  global.AVATARS = {
    max: "avatar_max.png",
    toni: "avatar_toni.png",
    ahmed: "avatar_ahmed.png",
    maria: "avatar_maria.png",
    marcela: "avatar_marcela.png",
    fallback: "avatar_default.png"
  };

  global.getBarsConfig = function(roleId="marcela", scenarioKey="s3"){
    const roleCfg = registry[roleId] || registry["marcela"];
    if (!roleCfg || !roleCfg.scenarios) return {scenario:{}};
    const sc = roleCfg.scenarios[scenarioKey] || roleCfg.scenarios["s3"] || Object.values(roleCfg.scenarios)[0];
    return { ...roleCfg, scenario: sc };
  };
})(typeof window !== "undefined" ? window : globalThis);
