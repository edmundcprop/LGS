function main() {
  const LABEL = 'LG Subscribe Search Relaunch 2026-05-05';
  const NEGATIVE_LIST = 'LG Subscribe Lead Quality Negatives 2026';
  const campaigns = [
    {
      name: 'LG Subscribe Brand',
      budget: 20,
      adGroup: 'LG Subscribe Brand',
      finalUrl: 'https://www.lg-puricare.com.my/lg-subscribe/',
      keywords: [
        '[lg subscribe]',
        '"lg subscribe malaysia"',
        '[lg puricare]',
        '"lg puricare subscription"',
        '"lg appliance subscription"',
        '"lg rent up"',
        '"lg rent up malaysia"',
      ],
      headlines: [
        'LG Subscribe Malaysia',
        'No Upfront Payment',
        'Monthly LG Plans',
        'Own LG After Contract',
        'Maintenance Included',
        'Premium LG For Your Home',
        'WhatsApp For Plan Advice',
        'Subscribe To LG Appliances',
        '5-7 Year Coverage',
        'Upgrade Your Home',
        'LG Appliances Monthly Plan',
        'Ask About Eligibility',
      ],
      descriptions: [
        'Enjoy premium LG appliances monthly with no heavy upfront payment.',
        'Ask our Malaysia team which LG Subscribe plan fits your home, product needs, and budget.',
        'From clean water to cooling and laundry, upgrade your home with LG Subscribe.',
        'WhatsApp us for model advice, monthly plan guidance, and next steps.',
      ],
    },
    {
      name: 'Water Purifier Subscribe',
      budget: 40,
      adGroup: 'LG Water Purifier',
      finalUrl: 'https://www.lg-puricare.com.my/water-purifier/',
      keywords: [
        '"lg water purifier subscription"',
        '"water purifier subscription malaysia"',
        '"water filter subscription malaysia"',
        '"water purifier monthly plan"',
        '"hot cold water purifier subscription"',
        '"tankless water purifier malaysia"',
        '"lg atom u water purifier"',
        '"lg water filter malaysia"',
      ],
      headlines: [
        'LG Water Purifier Plans',
        'Clean Water Monthly Plan',
        'Tankless Water Purifier',
        'No Heavy Upfront Cost',
        'For Malaysian Kitchens',
        'WhatsApp For Best Model',
        'Filter Care Support',
        'Subscribe To LG Water',
        'Hot And Cold Options',
        'Condo And Family Homes',
        'Ask About LG Subscribe',
        'Clean Water Made Simple',
      ],
      descriptions: [
        'Choose an LG water purifier for condo, landed home, or office pantry.',
        'Get clean water convenience with LG Subscribe. WhatsApp us for model and plan guidance.',
        'Enjoy LG water purifier comfort without a heavy upfront payment.',
        'Ask which model suits your kitchen space, family size, and usage.',
      ],
    },
    {
      name: 'Air Purifier And Haze',
      budget: 15,
      adGroup: 'Air Purifier Subscribe',
      finalUrl: 'https://www.lg-puricare.com.my/air-purifier/',
      keywords: [
        '"lg air purifier malaysia"',
        '"air purifier subscription malaysia"',
        '"air purifier monthly plan"',
        '"air purifier for haze"',
        '"air purifier for allergy malaysia"',
        '"air purifier for bedroom"',
        '"air purifier for pet hair"',
      ],
      headlines: [
        'LG Air Purifier Subscribe',
        'Cleaner Air At Home',
        'For Haze And Allergies',
        'Bedroom Air Purifier',
        'Pet-Friendly Home Air',
        'Monthly LG Plans',
        'WhatsApp For Advice',
        'Breathe Better Indoors',
        'No Heavy Upfront Cost',
        'For Malaysian Homes',
        'Allergy-Sensitive Homes',
        'Subscribe To Cleaner Air',
      ],
      descriptions: [
        'Make indoor air more comfortable for bedrooms, families, pets, and haze.',
        'Subscribe to LG air purifiers with monthly plans and simple WhatsApp guidance.',
        'Ask us which LG air purifier suits your room size and lifestyle.',
        'A practical upgrade for Malaysian homes concerned about haze, dust, pets, and allergies.',
      ],
    },
    {
      name: 'Air Conditioner Subscribe',
      budget: 15,
      adGroup: 'Air Conditioner Subscribe',
      finalUrl: 'https://www.lg-puricare.com.my/air-conditioner/',
      keywords: [
        '"lg air conditioner subscription"',
        '"aircon subscription malaysia"',
        '"air conditioner monthly plan"',
        '"lg inverter air conditioner malaysia"',
        '"1hp air conditioner subscription"',
        '"1.5hp air conditioner subscription"',
      ],
      headlines: [
        'LG Air Cond Subscription',
        'Cool Rooms Monthly Plan',
        'No Heavy Upfront Cost',
        'WhatsApp For HP Advice',
        'Inverter Air Conditioner',
        'Site Evaluation Guidance',
        'Cool Your Malaysian Home',
        'Subscribe To LG Air Cond',
        '1HP And 1.5HP Advice',
        'Monthly LG Cooling Plans',
        'Ask About Installation',
        'Comfort Without Big Upfront',
      ],
      descriptions: [
        'Not sure which HP fits your room? WhatsApp us for LG air cond advice.',
        'Enjoy a cooler Malaysian home with LG Subscribe monthly plans and installation guidance.',
        'Ask about room size, horsepower, installation, and monthly plan options.',
        'Upgrade your room cooling without a heavy upfront purchase.',
      ],
    },
    {
      name: 'Appliance Subscription Malaysia',
      budget: 10,
      adGroup: 'Appliance Subscription',
      finalUrl: 'https://www.lg-puricare.com.my/lg-subscribe/',
      keywords: [
        '"appliance subscription malaysia"',
        '"home appliance subscription"',
        '"electrical appliance subscription"',
        '"monthly appliance plan"',
        '"washing machine subscription malaysia"',
        '"tv subscription malaysia"',
      ],
      headlines: [
        'Appliance Subscription MY',
        'LG Appliances Monthly Plan',
        'No Heavy Upfront Payment',
        'Subscribe To Home Appliances',
        'Own At End Of Contract',
        'Maintenance Support',
        'WhatsApp For Plan Advice',
        'Upgrade Your Home With LG',
        'Water Air Cooling Laundry',
        'Built For Malaysian Homes',
        'Ask About Eligibility',
        'LG Subscribe Made Simple',
      ],
      descriptions: [
        'Choose LG appliances monthly with support and no heavy upfront.',
        'From clean water to cooling, LG Subscribe helps Malaysian homes upgrade.',
        'WhatsApp us to compare products, plans, contract duration, and eligibility.',
        'A smarter way to enjoy premium LG appliances without buying everything upfront.',
      ],
    },
  ];
  const negatives = [
    'agent commission',
    'career',
    'complaint',
    'customer service',
    'download',
    'error code',
    'free',
    'hotline',
    'how to fix',
    'job',
    'manual',
    'user manual',
    'service center',
    'repair',
    'spare part',
    'parts',
    'warranty claim',
    'contact number',
    'head office',
    'internship',
    'vacancy',
    'used',
    'second hand',
    'cheap used',
    'pdf',
    'troubleshooting',
    'remote control',
    'filter replacement only',
    'car',
    'phone',
  ];
  validateAdCopy(campaigns);
  ensureLabel(LABEL);
  const createdNew = ensureCampaigns(campaigns, LABEL);
  if (createdNew) {
    // Direct API creation is synchronous, but allow a short settle window
    // before AdsApp.campaigns() queries reflect the new entities.
    Utilities.sleep(10000);
  }
  ensureStructure(campaigns, LABEL);
  ensureNegativeList(NEGATIVE_LIST, negatives, campaigns);
  scheduleAndEnableCampaigns(campaigns);
  Logger.log('Setup complete. Campaigns start 2026-05-07 and run daily 09:00-18:00 Malaysia time.');
}

function scheduleAndEnableCampaigns(campaigns) {
  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  campaigns.forEach(function(spec) {
    const campaign = waitForCampaign(spec.name);
    campaign.setStartDate('20260507');
    const schedules = campaign.targeting().adSchedules().get();
    while (schedules.hasNext()) {
      schedules.next().remove();
    }
    days.forEach(function(day) {
      campaign.addAdSchedule(day, 9, 0, 18, 0);
    });
    campaign.enable();
    Logger.log('Scheduled and enabled: ' + spec.name);
  });
}

function ensureCampaigns(campaigns, label) {
  const missing = campaigns.filter(function(campaign) {
    return !findCampaign(campaign.name);
  });
  if (missing.length === 0) {
    Logger.log('All campaigns already exist.');
    return false;
  }
  // Modern Google Ads Scripts does not reliably expose programmatic
  // Search campaign creation (no AdsApp.newCampaignBuilder /
  // AdsApp.budgets().newBudgetBuilder in this account). Bulk uploads
  // also fail silently when the CSV header dialect is mismatched.
  // The robust path: create the 5 campaign shells manually in the UI
  // (one-time, ~5 minutes), then re-run this script — it will detect
  // them as existing and complete every other step automatically.
  const lines = [
    '',
    '==========================================================',
    'MANUAL STEP — create these ' + missing.length + ' campaign shells in Google Ads,',
    'then re-run this script. The script will do everything else.',
    '==========================================================',
    '',
    'In Google Ads, for EACH campaign below:',
    '  1. Campaigns -> click "+ New campaign"',
    '  2. Objective: Leads (or "Create campaign without a goal")',
    '  3. Campaign type: Search',
    '  4. Set name exactly as listed below',
    '  5. Bidding -> "Maximize clicks"',
    '     (uncheck "Set a maximum cost per click bid limit" for now)',
    '  6. Networks: Google Search ONLY (uncheck Search partners and',
    '     Display Network)',
    '  7. Locations: Malaysia',
    '  8. Languages: English, Malay (Bahasa Melayu), Chinese',
    '  9. Daily budget: as listed below (MYR)',
    '  10. SKIP keywords / ads / extensions on this screen — leave them',
    '     blank, the script will add them.',
    '  11. Save the campaign and immediately PAUSE it.',
    '',
    'Campaigns to create:',
  ];
  missing.forEach(function(c) {
    lines.push('  - Name: "' + c.name + '"   Daily budget: MYR ' + c.budget);
  });
  lines.push('');
  lines.push('After all ' + missing.length + ' are created (paused), re-run this script.');
  lines.push('It will add ad groups, keywords, RSAs, the shared negative');
  lines.push('keyword list, ad scheduling (Mon-Sun 09:00-18:00), set the');
  lines.push('start date to 2026-05-07, and enable the campaigns.');
  lines.push('==========================================================');
  Logger.log(lines.join('\n'));
  throw new Error('Manual campaign-shell creation required for: ' +
    missing.map(function(c) { return c.name; }).join(', '));
}

function ensureStructure(campaigns, label) {
  campaigns.forEach(function(spec) {
    const campaign = waitForCampaign(spec.name);
    campaign.pause();
    tryApplyLabel(campaign, label);
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
  return adGroup;
}

function ensureKeywords(adGroup, keywords, finalUrl) {
  const existing = {};
  const iterator = adGroup.keywords().get();
  while (iterator.hasNext()) {
    existing[String(iterator.next().getText()).toLowerCase()] = true;
  }
  keywords.forEach(function(text) {
    if (existing[String(text).toLowerCase()]) return;
    const operation = adGroup.newKeywordBuilder()
      .withText(text)
      .withFinalUrl(finalUrl)
      .build();
    if (!operation.isSuccessful()) {
      Logger.log('Keyword error for ' + text + ': ' + operation.getErrors());
    }
  });
}

function ensureResponsiveSearchAd(adGroup, spec) {
  if (adGroup.ads().get().hasNext()) {
    Logger.log('Ad exists in: ' + spec.name);
    return;
  }
  const operation = adGroup.newAd().responsiveSearchAdBuilder()
    .withFinalUrl(spec.finalUrl)
    .withHeadlines(spec.headlines)
    .withDescriptions(spec.descriptions)
    .build();
  if (!operation.isSuccessful()) {
    throw new Error('Could not create RSA for ' + spec.name + ': ' + operation.getErrors());
  }
}

function ensureNegativeList(listName, negatives, campaigns) {
  let list = findNegativeList(listName);
  if (!list) {
    const operation = AdsApp.newNegativeKeywordListBuilder()
      .withName(listName)
      .build();
    if (!operation.isSuccessful()) {
      throw new Error('Could not create negative keyword list: ' + operation.getErrors());
    }
    list = operation.getResult();
  }
  const existing = {};
  const iterator = list.negativeKeywords().get();
  while (iterator.hasNext()) {
    existing[String(iterator.next().getText()).replace(/^"|"$/g, '').toLowerCase()] = true;
  }
  const newNegatives = negatives
    .filter(function(text) { return !existing[String(text).toLowerCase()]; })
    .map(function(text) { return '"' + text + '"'; });
  if (newNegatives.length > 0) {
    list.addNegativeKeywords(newNegatives);
  }
  campaigns.forEach(function(spec) {
    const campaign = findCampaign(spec.name);
    if (campaign) campaign.addNegativeKeywordList(list);
  });
}

function findCampaign(name) {
  const iterator = AdsApp.campaigns()
    .withCondition('campaign.name = "' + escapeCondition(name) + '"')
    .get();
  return iterator.hasNext() ? iterator.next() : null;
}

function waitForCampaign(name) {
  const maxAttempts = 24;
  const intervalMs = 15000;
  for (let i = 0; i < maxAttempts; i++) {
    const campaign = findCampaign(name);
    if (campaign) {
      if (i > 0) Logger.log('Found campaign "' + name + '" after ' + (i * intervalMs / 1000) + 's');
      return campaign;
    }
    Logger.log('Waiting for campaign "' + name + '"... attempt ' + (i + 1) + '/' + maxAttempts);
    Utilities.sleep(intervalMs);
  }
  throw new Error('Campaign was not available after ' + (maxAttempts * intervalMs / 1000) +
    's: ' + name + '. Bulk upload may still be processing — re-run the script in a few minutes.');
}

function findNegativeList(name) {
  const iterator = AdsApp.negativeKeywordLists()
    .withCondition('shared_set.name = "' + escapeCondition(name) + '"')
    .get();
  return iterator.hasNext() ? iterator.next() : null;
}

function ensureLabel(name) {
  const iterator = AdsApp.labels()
    .withCondition('label.name = "' + escapeCondition(name) + '"')
    .get();
  if (!iterator.hasNext()) {
    AdsApp.createLabel(name, 'Created by setup script for LG Subscribe Search relaunch.', '#0B57D0');
  }
}

function tryApplyLabel(entity, label) {
  try {
    entity.applyLabel(label);
  } catch (error) {
    Logger.log('Label skipped: ' + error);
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

function escapeCondition(text) {
  return String(text).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}
