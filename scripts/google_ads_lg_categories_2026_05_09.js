function main() {
  const LABEL = 'LG Subscribe Categories Launch 2026-05-09';
  const NEGATIVE_LIST = 'LG Subscribe Category Negatives 2026';

  const campaigns = [
    {
      name: 'LG Subscribe Air Conditioners MY',
      budget: 25,
      adGroup: 'Air Conditioners',
      finalUrl: 'https://lgsubscribe.co/products/air-conditioners',
      keywords: [
        '[lg aircond malaysia]',
        '[lg air conditioner malaysia]',
        '[aircond lg malaysia]',
        '[aircond inverter lg]',
        '"lg dual inverter aircond"',
        '"aircond subscription malaysia"',
        '"aircond rumah baru"',
        '"aircond untuk rumah"',
      ],
      headlines: [
        'LG Aircond Malaysia',
        'Aircond LG Dari RM80',
        'Aircond Inverter LG',
        'Sejuk Cepat Dan Jimat',
        'Untuk Bilik Tidur',
        'Untuk Ruang Tamu',
        'Bayaran Bulanan Mudah',
        'Tanpa Modal Besar Awal',
        'LG DUAL Inverter',
        'Pilih Ikut Saiz Bilik',
        'WhatsApp Untuk Pelan',
        'Aircond Untuk Rumah Baru',
        'Sesuai Untuk Keluarga',
        'Semak Model Hari Ini',
        'LG Subscribe Aircond',
      ],
      descriptions: [
        'Pilih aircond LG inverter untuk bilik tidur dan ruang tamu keluarga anda.',
        'Bayaran bulanan dari RM80 untuk rumah yang mahu sejuk cepat dan jimat.',
        'WhatsApp kami untuk cadangan ikut saiz bilik, bajet dan jenis ruang rumah.',
        'Upgrade rumah dengan LG Subscribe tanpa kos awal yang besar.',
      ],
    },
    {
      name: 'LG Subscribe Washer Dryer MY',
      budget: 25,
      adGroup: 'Washer Dryers',
      finalUrl: 'https://lgsubscribe.co/products/washer-dryers',
      keywords: [
        '[lg washer dryer malaysia]',
        '[lg washtower malaysia]',
        '[washer dryer lg malaysia]',
        '[mesin basuh lg dryer]',
        '"washer dryer subscription malaysia"',
        '"washing machine subscription"',
        '"lg washing machine malaysia"',
        '"washer dryer rumah baru"',
      ],
      headlines: [
        'LG Washer Dryer Malaysia',
        'LG WashTower Untuk Rumah',
        'Washer Dryer LG Bulanan',
        'Mesin Basuh Dan Dryer',
        'Untuk Keluarga Sibuk',
        'Laundry Lebih Mudah',
        'Bayaran Bulanan Mudah',
        'Tanpa Modal Besar Awal',
        'Sesuai Untuk Rumah Baru',
        'WhatsApp Untuk Pelan',
        'Pilih Model Ikut Bajet',
        'LG Subscribe Laundry',
        'Upgrade Ruang Laundry',
        'Semak Pelan Hari Ini',
        'Washer Dryer Premium',
      ],
      descriptions: [
        'Upgrade laundry rumah dengan washer dryer LG melalui bayaran bulanan mudah.',
        'Sesuai untuk keluarga, rumah baru dan mereka yang mahu urus kain lebih senang.',
        'WhatsApp kami untuk semak model, pelan bulanan dan pilihan yang sesuai.',
        'Nikmati produk LG premium tanpa bayar besar sekali gus di awal.',
      ],
    },
    {
      name: 'LG Subscribe Refrigerators MY',
      budget: 25,
      adGroup: 'Refrigerators',
      finalUrl: 'https://lgsubscribe.co/products/refrigerators',
      keywords: [
        '[lg refrigerator malaysia]',
        '[lg fridge malaysia]',
        '[peti sejuk lg malaysia]',
        '[lg instaview malaysia]',
        '"refrigerator subscription malaysia"',
        '"fridge subscription malaysia"',
        '"peti sejuk rumah baru"',
        '"lg fridge monthly plan"',
      ],
      headlines: [
        'LG Refrigerator Malaysia',
        'Peti Sejuk LG Untuk Rumah',
        'LG Fridge Bayaran Bulanan',
        'LG InstaView Malaysia',
        'Untuk Dapur Keluarga',
        'Sesuai Untuk Rumah Baru',
        'Bayaran Bulanan Mudah',
        'Tanpa Modal Besar Awal',
        'Fridge LG Premium',
        'Pilih Ikut Bajet Anda',
        'WhatsApp Untuk Pelan',
        'Upgrade Dapur Anda',
        'Semak Model Hari Ini',
        'LG Subscribe Fridge',
        'Ruang Simpan Lebih Besar',
      ],
      descriptions: [
        'Pilih peti sejuk LG premium untuk dapur keluarga dengan bayaran bulanan.',
        'Sesuai untuk rumah baru, keluarga muda dan dapur yang perlukan ruang besar.',
        'WhatsApp kami untuk semak model, saiz dan pelan yang sesuai dengan bajet.',
        'Upgrade dapur dengan LG Subscribe tanpa kos awal yang besar.',
      ],
    },
    {
      name: 'LG Subscribe How It Works MY',
      budget: 25,
      adGroup: 'How It Works',
      finalUrl: 'https://lgsubscribe.co/how-it-works',
      keywords: [
        '[lg subscribe how it works]',
        '[lg subscribe malaysia]',
        '[lg appliance subscription]',
        '[lg subscription malaysia]',
        '"cara langgan lg"',
        '"lg subscribe plan"',
        '"home appliance subscription malaysia"',
        '"appliance monthly plan malaysia"',
      ],
      headlines: [
        'How LG Subscribe Works',
        'Cara Langgan LG Malaysia',
        'Pelan Bulanan LG',
        'Tanpa Modal Besar Awal',
        'Pilih Produk LG Premium',
        'Semak Cara Langgan',
        'Sesuai Untuk Rumah Baru',
        'Untuk Keluarga Malaysia',
        'Bayaran Bulanan Mudah',
        'WhatsApp Untuk Bantuan',
        'LG Subscribe Malaysia',
        'Pelan 60 Atau 84 Bulan',
        'Ketahui Proses Langgan',
        'Upgrade Rumah Dengan LG',
        'Semak Kelayakan Anda',
      ],
      descriptions: [
        'Ketahui cara LG Subscribe membantu anda upgrade rumah dengan bayaran bulanan.',
        'Lihat proses pilih produk, pilih pelan dan hantar enquiry melalui WhatsApp.',
        'Sesuai untuk keluarga Malaysia yang mahu produk LG tanpa kos awal besar.',
        'Semak cara pelan 60 atau 84 bulan berfungsi sebelum pilih produk.',
      ],
    },
  ];

  const negatives = [
    'free',
    'used',
    'second hand',
    'manual',
    'repair',
    'service center',
    'service centre',
    'part',
    'spare part',
    'career',
    'job',
    'internship',
    'download',
    'review',
    'youtube',
    'shopee',
    'lazada',
    'industrial',
    'commercial',
    'portable',
    'window',
    'used aircond',
    'used washer',
    'used dryer',
    'used fridge',
    'mini fridge',
  ];

  validateAdCopy(campaigns);
  ensureLabel(LABEL);
  ensureCampaigns(campaigns, LABEL);
  Utilities.sleep(10000);
  ensureStructure(campaigns, LABEL);
  ensureNegativeList(NEGATIVE_LIST, negatives, campaigns);
  Logger.log('Setup complete. Category campaigns are live.');
}

function ensureCampaigns(campaigns, label) {
  const missing = campaigns.filter(function(campaign) {
    return !findCampaign(campaign.name);
  });

  if (missing.length === 0) {
    Logger.log('All campaigns already exist.');
    return;
  }

  missing.forEach(function(campaign, index) {
    createSearchCampaign(campaign, index);
    Logger.log('Created campaign via mutateAll: ' + campaign.name);
  });
}

function createSearchCampaign(spec, index) {
  const customerId = AdsApp.currentAccount().getCustomerId().replace(/-/g, '');
  const tempBudgetId = -1 - (index * 3);
  const tempCampaignId = -2 - (index * 3);
  const budgetResource = 'customers/' + customerId + '/campaignBudgets/' + tempBudgetId;
  const campaignResource = 'customers/' + customerId + '/campaigns/' + tempCampaignId;

  const operations = [
    {
      campaignBudgetOperation: {
        create: {
          resourceName: budgetResource,
          name: spec.name + ' Budget RM' + spec.budget,
          amountMicros: String(spec.budget * 1000000),
          deliveryMethod: 'STANDARD',
          explicitlyShared: false,
        },
      },
    },
    {
      campaignOperation: {
        create: {
          resourceName: campaignResource,
          name: spec.name,
          status: 'ENABLED',
          advertisingChannelType: 'SEARCH',
          campaignBudget: budgetResource,
          maximizeConversions: {},
          networkSettings: {
            targetGoogleSearch: true,
            targetSearchNetwork: false,
            targetContentNetwork: false,
            targetPartnerSearchNetwork: false,
          },
          geoTargetTypeSetting: {
            positiveGeoTargetType: 'PRESENCE',
            negativeGeoTargetType: 'PRESENCE',
          },
          containsEuPoliticalAdvertising: 'DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING',
        },
      },
    },
    {
      campaignCriterionOperation: {
        create: {
          campaign: campaignResource,
          location: {
            geoTargetConstant: 'geoTargetConstants/2458',
          },
        },
      },
    },
  ];

  const results = AdsApp.mutateAll(operations, {
    apiVersion: 'v22',
    partialFailure: false,
  });

  results.forEach(function(result) {
    if (!result.isSuccessful()) {
      throw new Error('Could not create campaign shell for ' + spec.name + ': ' + result.getErrorMessages().join(' | '));
    }
  });
}

function ensureStructure(campaigns, label) {
  campaigns.forEach(function(spec) {
    const campaign = waitForCampaign(spec.name);
    tryApplyLabel(campaign, label);
    tryEnable(campaign);

    const adGroup = ensureAdGroup(campaign, spec.adGroup, label);
    ensureKeywords(adGroup, spec.keywords, spec.finalUrl);
    ensureResponsiveSearchAd(adGroup, spec);
  });
}

function ensureAdGroup(campaign, adGroupName, label) {
  const iterator = campaign.adGroups()
    .withCondition('ad_group.name = "' + escapeCondition(adGroupName) + '"')
    .get();

  if (iterator.hasNext()) {
    const existing = iterator.next();
    tryApplyLabel(existing, label);
    tryEnable(existing);
    Logger.log('Ad group exists: ' + campaign.getName() + ' > ' + adGroupName);
    return existing;
  }

  const operation = campaign.newAdGroupBuilder()
    .withName(adGroupName)
    .withStatus('ENABLED')
    .build();

  if (!operation.isSuccessful()) {
    throw new Error('Could not create ad group ' + adGroupName + ': ' + operation.getErrors());
  }

  const adGroup = operation.getResult();
  tryApplyLabel(adGroup, label);
  Logger.log('Created ad group: ' + campaign.getName() + ' > ' + adGroupName);
  return adGroup;
}

function ensureKeywords(adGroup, keywords, finalUrl) {
  const existing = {};
  const iterator = adGroup.keywords().get();
  while (iterator.hasNext()) {
    const keyword = iterator.next();
    existing[keyword.getText()] = true;
    tryEnable(keyword);
  }

  keywords.forEach(function(keywordText) {
    if (existing[keywordText]) {
      Logger.log('Keyword exists: ' + adGroup.getName() + ' > ' + keywordText);
      return;
    }

    const operation = adGroup.newKeywordBuilder()
      .withText(keywordText)
      .withFinalUrl(finalUrl)
      .build();

    if (!operation.isSuccessful()) {
      throw new Error('Could not create keyword ' + keywordText + ': ' + operation.getErrors());
    }

    Logger.log('Created keyword: ' + adGroup.getName() + ' > ' + keywordText);
  });
}

function ensureResponsiveSearchAd(adGroup, spec) {
  const iterator = adGroup.ads()
    .withCondition('ad_group_ad.ad.type = RESPONSIVE_SEARCH_AD')
    .get();

  if (iterator.hasNext()) {
    const existingAd = iterator.next();
    tryEnable(existingAd);
    Logger.log('RSA exists for ad group: ' + adGroup.getName());
    return existingAd;
  }

  const builder = adGroup.newAd().responsiveSearchAdBuilder()
    .withFinalUrl(spec.finalUrl);

  spec.headlines.forEach(function(headline) {
    builder.addHeadline(headline);
  });

  spec.descriptions.forEach(function(description) {
    builder.addDescription(description);
  });

  const operation = builder.build();
  if (!operation.isSuccessful()) {
    throw new Error('Could not create RSA for ' + adGroup.getName() + ': ' + operation.getErrors());
  }

  Logger.log('Created RSA for ad group: ' + adGroup.getName());
  return operation.getResult();
}

function ensureNegativeList(listName, negatives, campaigns) {
  let negativeList = findNegativeList(listName);

  if (!negativeList) {
    const operation = AdsApp.newNegativeKeywordListBuilder()
      .withName(listName)
      .build();

    if (!operation.isSuccessful()) {
      throw new Error('Could not create negative keyword list: ' + operation.getErrors());
    }

    negativeList = operation.getResult();
    Logger.log('Created negative keyword list: ' + listName);
  }

  const existing = {};
  const negativeIterator = negativeList.negativeKeywords().get();
  while (negativeIterator.hasNext()) {
    const negative = negativeIterator.next();
    existing[negative.getText()] = true;
  }

  negatives.forEach(function(term) {
    if (existing[term]) {
      return;
    }
    negativeList.addNegativeKeyword(term);
    Logger.log('Added negative keyword: ' + term);
  });

  campaigns.forEach(function(spec) {
    const campaign = waitForCampaign(spec.name);
    negativeList.addCampaign(campaign);
    Logger.log('Applied negative list to ' + spec.name);
  });
}

function findCampaign(campaignName) {
  const iterator = AdsApp.campaigns()
    .withCondition('campaign.name = "' + escapeCondition(campaignName) + '"')
    .get();

  return iterator.hasNext() ? iterator.next() : null;
}

function waitForCampaign(campaignName) {
  const deadline = new Date().getTime() + 120000;
  while (new Date().getTime() < deadline) {
    const campaign = findCampaign(campaignName);
    if (campaign) {
      return campaign;
    }
    Utilities.sleep(5000);
  }

  throw new Error('Timed out waiting for campaign: ' + campaignName);
}

function findNegativeList(listName) {
  const iterator = AdsApp.negativeKeywordLists()
    .withCondition('shared_set.name = "' + escapeCondition(listName) + '"')
    .get();

  return iterator.hasNext() ? iterator.next() : null;
}

function ensureLabel(labelName) {
  const iterator = AdsApp.labels()
    .withCondition('label.name = "' + escapeCondition(labelName) + '"')
    .get();

  if (iterator.hasNext()) {
    return iterator.next();
  }

  AdsApp.createLabel(labelName);
  Logger.log('Created label: ' + labelName);
  return null;
}

function tryApplyLabel(entity, labelName) {
  try {
    entity.applyLabel(labelName);
  } catch (error) {
    Logger.log('Label already applied or unavailable for entity: ' + labelName);
  }
}

function tryEnable(entity) {
  try {
    if (entity.isPaused && entity.isPaused()) {
      entity.enable();
    }
  } catch (error) {
    Logger.log('Could not enable entity: ' + error);
  }
}

function validateAdCopy(campaigns) {
  campaigns.forEach(function(spec) {
    spec.headlines.forEach(function(headline) {
      if (headline.length > 30) {
        throw new Error('Headline over 30 chars for ' + spec.name + ': ' + headline);
      }
    });

    spec.descriptions.forEach(function(description) {
      if (description.length > 90) {
        throw new Error('Description over 90 chars for ' + spec.name + ': ' + description);
      }
    });
  });
}

function escapeCondition(value) {
  return value.replace(/"/g, '\\"');
}
